import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  COMMUNITY_OFFERING_ADDR,
  CommunityOfferingABI,
  FROCK_ADDR,
  FrockABI,
  USDC_ADDR,
  USDCoinABI,
} from '@project/contracts/src/address';
import moment from 'moment';

import Countdown from '../../../components/countdown/countdown';
import { FROCK_DECIMALS, USDC_DECIMALS } from '../../../constants/index';
import { useWeb3Accounts } from '../../../hooks/ethers/account';
import { useContract } from '../../../hooks/ethers/contracts';
import { useProvider } from '../../../hooks/ethers/provider';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';
import CommunityList from '../sections/community-list/community-list';

export default function CommunitySale() {
  const [usdcBalance, setUsdcBalance] = useState('0');
  const [frockBalance, setFrockBalance] = useState('0');
  const [totalContribution, setTotalContribution] = useState('0');
  const [currentCap, setCurrentCap] = useState('0');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [globalMaximumContribution, setGlobalMaximulContribution] =
    useState('0');
  const [totalRaised, setTotalRaised] = useState('0');
  const accounts = useWeb3Accounts();
  const provider = useProvider();

  const usdCoin = useContract(USDCoinABI, provider, USDC_ADDR);
  const communityOffering = useContract(
    CommunityOfferingABI,
    provider,
    COMMUNITY_OFFERING_ADDR,
    accounts ? accounts[0] : 0,
  );
  const frockToken = useContract(
    FrockABI,
    provider,
    FROCK_ADDR,
    accounts ? accounts[0] : 0,
  );

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        await handleGetUSDC();
        await handleGetFrock();

        await handleGetTotalContribution();

        await handleGetStartTime();
        await handleGetEndTime();

        await handleGetCurrentCap();

        await handleGetMaxContribution();
        await handleGetTotalRaised();
      }
    })();
  }, [provider, accounts]);

  const handleGetUSDC = async () => {
    const usdcBalanceResult = await usdCoin.balanceOf(accounts[0]);
    setUsdcBalance(formatUnits(usdcBalanceResult, USDC_DECIMALS));
  };

  const handleGetFrock = async () => {
    const frockBalanceResult = await frockToken.balanceOf(accounts[0]);
    setFrockBalance(formatUnits(frockBalanceResult, FROCK_DECIMALS));
  };

  const handleGetTotalContribution = async () => {
    const totalContributionResult = await communityOffering.investorInfoMap(
      accounts[0],
    );
    setTotalContribution(
      formatUnits(totalContributionResult.amountInvested, USDC_DECIMALS),
    );
  };

  const handleGetStartTime = async () => {
    const startTimeResult = await communityOffering.startTime();
    setStartTime(startTimeResult.toString());
  };

  const handleGetEndTime = async () => {
    const endTimeResult = await communityOffering.endTime();
    setEndTime(endTimeResult.toString());
  };

  const handleGetCurrentCap = async () => {
    const startDate = moment.unix(startTime).utc();
    const endDate = moment.unix(endTime).utc();
    if (
      moment(new Date()).isSameOrAfter(startDate) &&
      moment(new Date()).isSameOrBefore(endDate)
    ) {
      const currentCapResult = await communityOffering.currentCap();
      setCurrentCap(formatUnits(currentCapResult, USDC_DECIMALS));
    }
  };

  const handleGetMaxContribution = async () => {
    const globalMaximumContributonResult =
      await communityOffering.totalraiseCap();
    setGlobalMaximulContribution(
      formatUnits(globalMaximumContributonResult, USDC_DECIMALS),
    );
  };

  const handleGetTotalRaised = async () => {
    const totalRaisedResult = await communityOffering.totalraised();
    setTotalRaised(formatUnits(totalRaisedResult, USDC_DECIMALS));
  };

  const handleDeposit = async depositAmount => {
    const parsedDepositAmount = parseUnits(
      String(depositAmount),
      USDC_DECIMALS,
    );

    try {
      const tx = await communityOffering.invest(parsedDepositAmount);
      await tx.wait();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleRedeem = async () => {
    try {
      const tx = await communityOffering.redeem();
      await tx.wait();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Container className="sale">
      <Row className="sale__header">
        <Col lg={6}>
          <h1>Fractional Rocket Community Sale</h1>
        </Col>
        <Col lg={6}>
          <Countdown className="float-lg-end" />
        </Col>
      </Row>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate mi
        mattis vitae lobortis pharetra tincidunt vivamus dignissim rhoncus. Mi,
        rhoncus est sapien sed enim. Proin rhoncus augue id viverra nulla ac
        porttitor. Donec purus amet nunc eget morbi. Vulputate mi mattis vitae
        lobortis pharetra tincidunt vivamus dignissim rhoncus. Mi, rhoncus est
        sapien sed enim
      </p>
      <Row>
        <Col lg={7}>
          <CardCoinRaised
            communitySale
            startTime={startTime}
            endTime={endTime}
            globalMaximumContribution={globalMaximumContribution}
            totalRaised={totalRaised}
          />
        </Col>
        <Col lg={5}>
          <CardBalance usdcBalance={usdcBalance} frockBalance={frockBalance} />
          <CardDeposit
            totalContribution={totalContribution}
            maxContribution={currentCap}
            handleDeposit={handleDeposit}
            handleRedeem={handleRedeem}
            communitySale
          />
          <CommunityList />
        </Col>
      </Row>
    </Container>
  );
}
