import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  DIVIDEN_ADDR,
  DividenABI,
  FROCK_ADDR,
  FrockABI,
  SPOOKY_ADDR,
  SpookyABI,
  WFTM_ADDR,
} from '@project/contracts/src/address';
import { isEmpty } from 'lodash';

import { FROCK_DECIMALS } from '../../constants';
import { useWeb3Accounts } from '../../hooks/ethers/account';
import { useContract } from '../../hooks/ethers/contracts';
import { useProvider } from '../../hooks/ethers/provider';
import CardFrock from './sections/card-frock/card-frock';
import CardTrade from './sections/card-trade/card-trade';
import CardTreasury from './sections/card-treasury/card-treasury';
import FaqSection from './sections/faq-section/faq-section';

function Dashboard() {
  const accounts = useWeb3Accounts();
  const provider = useProvider();

  const [refetch, setRefetch] = useState(false);
  const [snapshotId, setSnapshotId] = useState('0');
  const [frockPrice, setFrockPrice] = useState('0');
  const [buildTradeDividend, setBuildTradeDividend] = useState('0');
  const [claimableDividend, setClaimableDividend] = useState({
    trade: '0',
    treasury: '0',
  });
  const [totalClaimed, setTotalClaimed] = useState({
    trade: '0',
    treasury: '0',
  });
  const [tokenBalance, setTokenBalance] = useState('0');
  const [rewards, setRewards] = useState({
    trade: [],
    treasury: [],
  });
  const [claimButtonIsLoading, setClaimButtonIsLoading] = useState(null);

  const frockContract = useContract(
    FrockABI,
    provider,
    FROCK_ADDR,
    accounts ? accounts[0] : 0,
  );

  const dividenDistributor = useContract(
    DividenABI,
    provider,
    DIVIDEN_ADDR,
    accounts ? accounts[0] : 0,
  );

  const spookyRouter = useContract(
    SpookyABI,
    provider,
    SPOOKY_ADDR,
    accounts ? accounts[0] : 0,
  );

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        await handleGetLastSnapshot();
        await handleGetFrockPrice();
        await handleBuildTradeDividend();
        await handleClaimableDividend();
        await handleHolderToTotalClaimed();
        await handleGetTokenBalance();

        await handleGetRewards();

        await handleRefetch(false);
      }
    })();
  }, [
    provider,
    accounts,
    refetch,
    snapshotId,
    tokenBalance,
    buildTradeDividend,
  ]);

  const handleRefetch = async value => {
    setRefetch(value);
  };

  const handleGetLastSnapshot = async () => {
    const lastSnapshotResult = await frockContract.lastSnapshotId();
    setSnapshotId(lastSnapshotResult.toString());
  };

  const handleFrockToFTM = async (amount, firstPair, secondPair) => {
    const frockToFTM = await spookyRouter.getAmountsOut(amount, [
      firstPair,
      secondPair,
    ]);

    return frockToFTM;
  };

  const handleBuildTradeDividend = async () => {
    if (!accounts || snapshotId === '0') return;

    const buildTradeDividenResult =
      await dividenDistributor.buildingTradeDividendOfHolder(accounts[0]);

    if (buildTradeDividenResult.toString() === '0') return;

    const resultConverted = await handleFrockToFTM(
      buildTradeDividenResult,
      FROCK_ADDR,
      WFTM_ADDR,
    );

    setBuildTradeDividend(formatUnits(resultConverted[1], 18));
  };

  const handleGetFrockPrice = async () => {
    if (!accounts) return;

    const resultConverted = await handleFrockToFTM(
      parseUnits('1', 9),
      FROCK_ADDR,
      WFTM_ADDR,
    );
    setFrockPrice(formatUnits(resultConverted[1], 18));
  };

  const handleClaimableDividend = async () => {
    if (!accounts) return;
    const tradeDividend = await dividenDistributor.getTotalUnclaimedReward(
      accounts[0],
      0,
    );
    const treasuryDividend = await dividenDistributor.getTotalUnclaimedReward(
      accounts[0],
      1,
    );
    setClaimableDividend({
      trade: formatUnits(tradeDividend, 18),
      treasury: formatUnits(treasuryDividend, 18),
    });
  };

  const handleHolderToTotalClaimed = async () => {
    if (!accounts) return;
    const tradeTotalClaimed = await dividenDistributor.holderToTotalClaimed(
      accounts[0],
      0,
    );
    const treasuryTotalClaimed = await dividenDistributor.holderToTotalClaimed(
      accounts[0],
      1,
    );
    setTotalClaimed({
      trade: formatUnits(tradeTotalClaimed, 18),
      treasury: formatUnits(treasuryTotalClaimed, 18),
    });
  };

  const handleGetTokenBalance = async () => {
    if (!accounts) return;
    const tokenBalanceResult = await dividenDistributor.getTokenBalance();
    if (tokenBalanceResult.toString() === '0') return;
    const resultConverted = await handleFrockToFTM(
      tokenBalanceResult,
      FROCK_ADDR,
      WFTM_ADDR,
    );
    setTokenBalance(formatUnits(resultConverted[1], 18));
  };

  const handleGetRewards = async () => {
    if (!accounts) return;
    const tradeRewardsResult = await dividenDistributor.getUnclaimedRewardIds(
      accounts[0],
      0,
    );
    const treasuryRewardsResult =
      await dividenDistributor.getUnclaimedRewardIds(accounts[0], 1);
    setRewards({
      trade: tradeRewardsResult,
      treasury: treasuryRewardsResult,
    });
  };

  const handleClaim = async rewardSource => {
    if (isEmpty(rewards.trade) && isEmpty(rewards.treasury)) return;
    try {
      if (rewardSource === 0) {
        setClaimButtonIsLoading('trade');
        const resultTradeClaim = await dividenDistributor.batchClaimReward(
          rewards.trade,
        );
        resultTradeClaim.wait();
      }

      if (rewardSource === 1) {
        setClaimButtonIsLoading('treasury');
        const resultTreasuryClaim = await dividenDistributor.batchClaimReward(
          rewards.treasury,
        );
        resultTreasuryClaim.wait();
      }

      await handleRefetch(true);
    } catch (e) {
      console.log(e);
    } finally {
      setClaimButtonIsLoading(null);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTrade
            buildTradeDividend={buildTradeDividend}
            claimableDividend={claimableDividend.trade}
            totalClaimed={totalClaimed.trade}
            handleClaim={handleClaim}
            isClaimButtonLoading={claimButtonIsLoading === 'trade'}
          />
        </Col>
        <Col lg={4} className="mb-4">
          <CardFrock frockPrice={frockPrice} tokenBalance={tokenBalance} />
        </Col>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTreasury
            claimableDividend={claimableDividend.treasury}
            totalClaimed={totalClaimed.treasury}
            handleClaim={handleClaim}
            isClaimButtonLoading={claimButtonIsLoading === 'treasury'}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="px-mobile-0">
          <FaqSection />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
