import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  COMMUNITY_OFFERING_ADDR,
  COMMUNITY_OFFERING_NRT_ADDR,
  CommunityOfferingABI,
  CommunityOfferingNRTABI,
  USDC_ADDR,
  USDCoinABI,
} from '@project/contracts/src/address';
import moment from 'moment';

import ellipseTopLeft from '../../../assets/ellipse-top-left.svg';
import CountdownUI from '../../../components/countdown/countdown';
import { ToastError } from '../../../components/toast/toast';
import { FROCK_DECIMALS, USDC_DECIMALS } from '../../../constants/index';
import { useWeb3Accounts } from '../../../hooks/ethers/account';
import { useContract } from '../../../hooks/ethers/contracts';
import { useProvider } from '../../../hooks/ethers/provider';
import {
  handleCommunityDepositErr,
  handleCommunityRedeemErr,
} from '../../../utils/error';
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

  const startTimeUtc = moment.unix(startTime).utc();
  const isAfterStartTime = moment(new Date()).isSameOrAfter(startTimeUtc);

  const usdCoin = useContract(
    USDCoinABI,
    provider,
    USDC_ADDR,
    accounts ? accounts[0] : 0,
  );
  const communityOffering = useContract(
    CommunityOfferingABI,
    provider,
    COMMUNITY_OFFERING_ADDR,
    accounts ? accounts[0] : 0,
  );

  const communityOfferingNRT = useContract(
    CommunityOfferingNRTABI,
    provider,
    COMMUNITY_OFFERING_NRT_ADDR,
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
    const frockBalanceResult = await communityOfferingNRT.balanceOf(
      accounts[0],
    );
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
    const currentCapResult = await communityOffering.currentCap();
    setCurrentCap(formatUnits(currentCapResult, USDC_DECIMALS));
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
    if (!accounts) return;
    const parsedDepositAmount = parseUnits(
      String(depositAmount),
      USDC_DECIMALS,
    );

    try {
      await usdCoin.approve(COMMUNITY_OFFERING_ADDR, parsedDepositAmount);
      const tx = await communityOffering.invest(parsedDepositAmount);
      await tx.wait();
    } catch (error) {
      const errorMsg = error.data.message;
      ToastError(handleCommunityDepositErr(errorMsg));
    }
  };

  const handleRedeem = async () => {
    try {
      const tx = await communityOffering.redeem();
      await tx.wait();
    } catch (error) {
      const errorMsg = error.data.message;
      ToastError(handleCommunityRedeemErr(errorMsg));
    }
  };

  const renderCountdown = () => {
    const countdownTime = moment(startTime).add(2, 'days').valueOf();
    if (moment(startTime).isSame(new Date())) {
      return <Countdown daysInHours date={countdownTime} />;
    }
    return '00:00:00';
  };

  return (
    <div className="position-relative">
      <img
        src={ellipseTopLeft}
        className="sale-ellipse-top-left"
        alt="ellipse on top left"
      />
      <Container className="sale">
        <Row className="sale__header">
          <Col lg={6}>
            <h1>Fractional Rocket Community Sale</h1>
          </Col>
          <Col lg={6}>
            {startTime !== null && isAfterStartTime && (
              <CountdownUI
                countdown={renderCountdown()}
                className="float-lg-end"
              />
            )}
          </Col>
        </Row>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate mi
          mattis vitae lobortis pharetra tincidunt vivamus dignissim rhoncus.
          Mi, rhoncus est sapien sed enim. Proin rhoncus augue id viverra nulla
          ac porttitor. Donec purus amet nunc eget morbi. Vulputate mi mattis
          vitae lobortis pharetra tincidunt vivamus dignissim rhoncus. Mi,
          rhoncus est sapien sed enim
        </p>
        <Row>
          <Col lg={7}>
            <CardCoinRaised
              communitySale
              startTime={startTime}
              endTime={endTime}
              totalLimit={globalMaximumContribution}
              totalRaised={totalRaised}
              maxContribution={currentCap}
            />
          </Col>
          <Col lg={5}>
            <CardBalance
              communitySale
              usdcBalance={usdcBalance}
              frockBalance={frockBalance}
            />
            <CardDeposit
              communitySale
              startTime={startTime}
              endTime={endTime}
              totalContribution={totalContribution}
              maxContribution={currentCap}
              handleDeposit={handleDeposit}
              handleRedeem={handleRedeem}
              frockBalance={frockBalance}
            />
            <CommunityList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
