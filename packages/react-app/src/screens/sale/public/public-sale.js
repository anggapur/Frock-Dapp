import { useEffect, useState } from 'react';
import React, { Col, Container, Row } from 'react-bootstrap';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  COMMUNITY_OFFERING_NRT_ADDR,
  CommunityOfferingNRTABI,
  FAIR_PRICE_ADDR,
  FAIR_PRICE_NRT_ADDR,
  FairPriceLaunchABI,
  FairPriceLaunchNRTABI,
  USDC_ADDR,
  USDCoinABI,
} from '@project/contracts/src/address';
import moment from 'moment';

import CountdownUI from '../../../components/countdown/countdown';
import { ToastError } from '../../../components/toast/toast';
import { FROCK_DECIMALS, USDC_DECIMALS } from '../../../constants/index';
import { useWeb3Accounts } from '../../../hooks/ethers/account';
import { useContract } from '../../../hooks/ethers/contracts';
import { useProvider } from '../../../hooks/ethers/provider';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';
import CommunityList from '../sections/community-list/community-list';

export default function PublicSale() {
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
  const fairLaunch = useContract(
    FairPriceLaunchABI,
    provider,
    FAIR_PRICE_ADDR,
    accounts ? accounts[0] : 0,
  );

  console.log('fairLaunch', fairLaunch);

  const fairLaunchNRT = useContract(
    FairPriceLaunchNRTABI,
    provider,
    FAIR_PRICE_NRT_ADDR,
    accounts ? accounts[0] : 0,
  );

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        await handleGetUSDC();
        await handleGetFrock();

        // await handleGetTotalContribution();

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
    const frockBalanceResult = await fairLaunchNRT.balanceOf(accounts[0]);
    setFrockBalance(formatUnits(frockBalanceResult, FROCK_DECIMALS));
  };

  const handleGetTotalContribution = async () => {
    const totalContributionResult = await fairLaunch.investorInfoMap(
      accounts[0],
    );
    setTotalContribution(
      formatUnits(totalContributionResult.amountInvested, USDC_DECIMALS),
    );
  };

  const handleGetStartTime = async () => {
    const startTimeResult = await fairLaunch.launchStartTime();
    setStartTime(startTimeResult.toString());
  };

  const handleGetEndTime = async () => {
    const endTimeResult = await fairLaunch.launchEndTime();
    setEndTime(endTimeResult.toString());
  };

  const handleGetCurrentCap = async () => {
    const today = new Date();
    const startDate = moment.unix(startTime).utc();
    const endDate = moment.unix(endTime).utc();
    if (
      moment(today).isSameOrAfter(startDate) &&
      moment(today).isSameOrBefore(endDate)
    ) {
      const currentCapResult = await fairLaunch.currentCap();
      setCurrentCap(formatUnits(currentCapResult, USDC_DECIMALS));
    }
  };

  const handleGetMaxContribution = async () => {
    const globalMaximumContributonResult = await fairLaunch.totalraiseCap();
    setGlobalMaximulContribution(
      formatUnits(globalMaximumContributonResult, USDC_DECIMALS),
    );
  };

  const handleGetTotalRaised = async () => {
    const totalRaisedResult = await fairLaunch.totalraised();
    setTotalRaised(formatUnits(totalRaisedResult, USDC_DECIMALS));
  };

  const handleDeposit = async withdrawAmount => {
    const parsedWithdrawAmount = parseUnits(
      String(withdrawAmount),
      USDC_DECIMALS,
    );

    try {
      const tx = await fairLaunch.invest(parsedWithdrawAmount);
      await tx.wait();
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  const handleWithdraw = async withdrawAmount => {
    const parsedWithdrawAmount = parseUnits(
      String(withdrawAmount),
      USDC_DECIMALS,
    );

    try {
      const tx = await fairLaunch.claimRedeemable(parsedWithdrawAmount);
      await tx.wait();
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  const handleRedeem = async () => {
    try {
      const tx = await fairLaunch.redeem();
      await tx.wait();
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  return (
    <Container className="sale">
      <Row className="sale__header">
        <Col lg={6}>
          <h1>Fractional Rocket Public Sale</h1>
        </Col>
        <Col lg={6}>
          <CountdownUI className="float-lg-end" />
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
            endTime={endTime}
            totalContribution={totalContribution}
            maxContribution={currentCap}
            handleDeposit={handleDeposit}
            handleWithdraw={handleWithdraw}
            handleRedeem={handleRedeem}
            frockBalance={frockBalance}
          />
          <CommunityList />
        </Col>
      </Row>
    </Container>
  );
}
