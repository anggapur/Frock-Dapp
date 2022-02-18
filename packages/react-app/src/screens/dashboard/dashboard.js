import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import {
  DIVIDEN_ADDR,
  DividenABI,
  FROCK_ADDR,
  FrockABI,
} from '@project/contracts/src/address';
import { isEmpty } from 'lodash';

import { useWeb3Accounts } from '../../hooks/ethers/account';
import { useContract } from '../../hooks/ethers/contracts';
import { useProvider } from '../../hooks/ethers/provider';
import CardFrock from './sections/card-frock/card-frock';
import CardTrade from './sections/card-trade/card-trade';
import CardTreasury from './sections/card-treasury/card-treasury';
import FaqSection from './sections/faq-section/faq-section';

export default function Dashboard() {
  const accounts = useWeb3Accounts();
  const provider = useProvider();

  const [snapshotId, setSnapshotId] = useState('0');
  const [buildTradeDividend, setBuildTradeDividend] = useState('0');
  const [claimableDividend, setClaimableDividend] = useState({
    trade: '0',
    treasury: '0',
  });
  const [totalClaim, setTotalClaim] = useState({
    trade: '0',
    treasury: '0',
  });
  const [tokenBalance, setTokenBalance] = useState('0');
  const [rewards, setRewards] = useState({
    trade: [],
    treasury: [],
  });

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

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        await handleGetLastSnapshot();
        await handleBuildTradeDividend();
        await handleClaimableDividend();
        await handleHolderToTotalClaimed();
        await handleGetTokenBalance();

        await handleGetRewards();
      }
    })();
  }, [provider, accounts]);

  const handleGetLastSnapshot = async () => {
    const lastSnapshotResult = await frockContract.lastSnapshotId();
    setSnapshotId(lastSnapshotResult.toString());
  };

  const handleBuildTradeDividend = async () => {
    if (!accounts) return;
    if (snapshotId === '0') return;

    const buildTradeDividenResult =
      await dividenDistributor.buildingTradeDividendOfHolder(accounts[0]);
    setBuildTradeDividend(buildTradeDividenResult);
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
      trade: tradeDividend,
      treasury: treasuryDividend,
    });
  };

  const handleHolderToTotalClaimed = async () => {
    if (!accounts) return;
    const tradeTotalClaimed = await dividenDistributor.holderToTotalClaimed(
      accounts[0],
      0,
    );
    const treasuryTotalClaimed =
      await dividenDistributor.getTotalUnclaimedReward(accounts[0], 1);
    setTotalClaim({
      trade: tradeTotalClaimed,
      treasury: treasuryTotalClaimed,
    });
  };

  const handleGetTokenBalance = async () => {
    if (!accounts) return;
    const tokenBalanceResult = await dividenDistributor.getTokenBalance();
    setTokenBalance(tokenBalanceResult);
  };

  const handleGetRewards = async () => {
    if (!accounts) return;
    const tradeRewardsResult = await dividenDistributor.getRewardIdsUnclaimed(
      accounts[0],
      0,
    );
    const treasuryRewardsResult =
      await dividenDistributor.getRewardIdsUnclaimed(accounts[0], 1);
    setRewards({
      trade: tradeRewardsResult,
      treasury: treasuryRewardsResult,
    });
  };

  const handleClaim = async rewardSource => {
    if (isEmpty(rewards.trade) && isEmpty(rewards.treasury)) return;
    try {
      if (rewardSource === 0) {
        const resultTradeClaim = await dividenDistributor.batchClaimReward(
          rewards.trade,
        );
        resultTradeClaim.wait();
      }

      if (rewardSource === 1) {
        const resultTreasuryClaim = await dividenDistributor.batchClaimReward(
          rewards.treasury,
        );
        resultTreasuryClaim.wait();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTrade
            buildTradeDividend={buildTradeDividend}
            handleClaim={handleClaim}
          />
        </Col>
        <Col lg={4} className="mb-4">
          <CardFrock />
        </Col>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTreasury handleClaim={handleClaim} />
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
