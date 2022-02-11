import { useEffect, useState } from 'react';
import React, { Col, Container, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  FAIR_PRICE_ADDR,
  FAIR_PRICE_NRT_ADDR,
  FROCK_ADDR,
  FairPriceLaunchABI,
  FairPriceLaunchNRTABI,
  FrockABI,
  USDC_ADDR,
  USDCoinABI,
} from '@project/contracts/src/address';
import moment from 'moment';

import ellipseTopLeft from '../../../assets/ellipse-top-left.svg';
import CountdownUI from '../../../components/countdown/countdown';
import { ToastError, ToastSuccess } from '../../../components/toast/toast';
import { FROCK_DECIMALS, USDC_DECIMALS } from '../../../constants/index';
import { useWeb3Accounts } from '../../../hooks/ethers/account';
import { useContract } from '../../../hooks/ethers/contracts';
import { useProvider } from '../../../hooks/ethers/provider';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';

export default function PublicSale() {
  const [usdcBalance, setUsdcBalance] = useState('0');
  const [nrtBalance, setNRTBalance] = useState('0');
  const [frockBalance, setFrockBalance] = useState('0');
  const [prices, setPrices] = useState({
    startPrice: '0',
    currentPrice: '0',
  });
  const [maxGlobalInvest, setMaxGlobalInvest] = useState('0');
  const [totalGlobalInvested, setTotalGlobalInvested] = useState('0');
  const [totalContribution, setTotalContribution] = useState('0');
  const [maxContribution, setMaxContribution] = useState('0');
  const [startTime, setStartTime] = useState(1645286400);
  const [endTime, setEndTime] = useState(1645459200);
  const [isRedeemEnabled, setIsRedeemEnabled] = useState(false);
  const [isClaimEnabled, setIsClaimEnabled] = useState(false);
  const [refetch, setRefetch] = useState(false);
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
  const fairLaunch = useContract(
    FairPriceLaunchABI,
    provider,
    FAIR_PRICE_ADDR,
    accounts ? accounts[0] : 0,
  );

  const fairLaunchNRT = useContract(
    FairPriceLaunchNRTABI,
    provider,
    FAIR_PRICE_NRT_ADDR,
    accounts ? accounts[0] : 0,
  );

  const frockContract = useContract(
    FrockABI,
    provider,
    FROCK_ADDR,
    accounts ? accounts[0] : 0,
  );

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        await handleGetUSDC();
        await handleGetNRT();
        await handleGetFrock();

        await handleGetGlobalMaxInvest();
        await handleGetTotalInvested();
        await handleGetPrices();
        await handleGetTotalContribution();

        await handleGetIsRedeemEnabled();
        await handleGetIsClaimEnabled();

        await handleGetStartTime();
        await handleGetEndTime();

        await handleGetMaxContribution();

        await handleRefetch(false);
      }
    })();
  }, [provider, accounts, refetch]);

  const handleRefetch = async value => {
    setRefetch(value);
  };

  const handleGetUSDC = async () => {
    const usdcBalanceResult = await usdCoin.balanceOf(accounts[0]);
    setUsdcBalance(formatUnits(usdcBalanceResult, USDC_DECIMALS));
  };

  const handleGetNRT = async () => {
    const nrtBalanceResult = await fairLaunchNRT.balanceOf(accounts[0]);
    setNRTBalance(formatUnits(nrtBalanceResult, FROCK_DECIMALS));
  };

  const handleGetFrock = async () => {
    const frockBalanceResult = await frockContract.balanceOf(accounts[0]);
    setFrockBalance(formatUnits(frockBalanceResult, FROCK_DECIMALS));
  };

  const handleGetIsRedeemEnabled = async () => {
    const isRedeemEnabledResult = await fairLaunch.redeemEnabled();
    setIsRedeemEnabled(isRedeemEnabledResult);
  };

  const handleGetIsClaimEnabled = async () => {
    const isClaimEnabledResult = await fairLaunch.claimEnabled();
    setIsClaimEnabled(isClaimEnabledResult);
  };

  const handleGetPrices = async () => {
    const getStartPriceResult = await fairLaunch.startingPrice();
    const getCurrentPriceResult = await fairLaunch.currentPrice();

    setPrices({
      startPrice: formatUnits(getStartPriceResult, USDC_DECIMALS),
      currentPrice: formatUnits(getCurrentPriceResult, USDC_DECIMALS),
    });
  };

  const handleGetGlobalMaxInvest = async () => {
    const maxGlobalInvestResult = await fairLaunch.maxGlobalInvestAllowed();
    setMaxGlobalInvest(formatUnits(maxGlobalInvestResult, USDC_DECIMALS));
  };

  const handleGetTotalContribution = async () => {
    const totalContributionResult = await fairLaunch.investorInfoMap(
      accounts[0],
    );
    setTotalContribution(
      formatUnits(totalContributionResult[0], USDC_DECIMALS),
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

  const handleGetMaxContribution = async () => {
    const maxContributionResult = await fairLaunch.maxInvestAllowed();
    setMaxContribution(formatUnits(maxContributionResult, USDC_DECIMALS));
  };

  const handleGetTotalInvested = async () => {
    const totalGlobalInvestedResult = await fairLaunch.totalGlobalInvested();
    setTotalGlobalInvested(
      formatUnits(totalGlobalInvestedResult, USDC_DECIMALS),
    );
  };

  const handleDeposit = async depositAmount => {
    if (!accounts) return;
    const parsedDepositAmount = parseUnits(
      String(depositAmount),
      USDC_DECIMALS,
    );
    try {
      await usdCoin.approve(FAIR_PRICE_ADDR, parsedDepositAmount);
      const tx = await fairLaunch.invest(parsedDepositAmount);
      await tx.wait();
      await handleRefetch(true);
      ToastSuccess('Your transaction has been processed!');
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  const handleWithdraw = async withdrawAmount => {
    if (!accounts) return;
    const parsedWithdrawAmount = parseUnits(
      String(withdrawAmount),
      USDC_DECIMALS,
    );

    try {
      await usdCoin.approve(FAIR_PRICE_ADDR, parsedWithdrawAmount);
      const tx = await fairLaunch.claimRedeemable(parsedWithdrawAmount);
      await tx.wait();
      await handleRefetch(true);
      ToastSuccess('Your transaction has been processed!');
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  const handleRedeem = async () => {
    try {
      const tx = await fairLaunch.redeem();
      await tx.wait();
      await handleRefetch(true);
      ToastSuccess('Your transaction has been processed!');
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
  };

  const renderCountdown = () => {
    const countdownTime = moment(startTime).add(2, 'days').valueOf();
    if (moment(startTime).isSame(new Date())) {
      return <Countdown daysInHours date={countdownTime} />;
    }
    return '00:00:00';
  };

  const handleClaim = async () => {
    try {
      const tx = await fairLaunch.claimRedeemable();
      await tx.wait();
    } catch (error) {
      ToastError('There is something wrong. Please try again!');
    }
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
          <Col lg={8}>
            <h1>
              Fractional Rocket Public Sale -{' '}
              {startTimeUtc.utc().format('DD MMM. h:mm A UTC')}
            </h1>
          </Col>
          <Col lg={4}>
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
              communitySale={false}
              startTime={startTime}
              endTime={endTime}
              totalLimit={maxGlobalInvest}
              totalRaised={totalGlobalInvested}
              maxContribution={maxContribution}
              prices={prices}
            />
          </Col>
          <Col lg={5}>
            <CardBalance
              usdcBalance={usdcBalance}
              nrtBalance={nrtBalance}
              frockBalance={frockBalance}
            />
            <CardDeposit
              startTime={startTime}
              endTime={endTime}
              isRedeemEnabled={isRedeemEnabled}
              isClaimEnabled={isClaimEnabled}
              totalContribution={totalContribution}
              maxContribution={maxContribution}
              handleDeposit={handleDeposit}
              handleWithdraw={handleWithdraw}
              handleRedeem={handleRedeem}
              handleClaim={handleClaim}
              nrtBalance={nrtBalance}
            />
            {/* <CommunityList /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
