import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { formatUnits, parseUnits } from '@ethersproject/units';
import {
  COMMUNITY_OFFERING_ADDR,
  COMMUNITY_OFFERING_NRT_ADDR,
  CommunityOfferingABI,
  CommunityOfferingNRTABI,
  FROCK_ADDR,
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
import {
  handleCommunityDepositErr,
  handleCommunityRedeemErr,
} from '../../../utils/error';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';

export default function CommunitySale() {
  const [usdcBalance, setUsdcBalance] = useState('0');
  const [nrtBalance, setNRTBalance] = useState('0');
  const [frockBalance, setFrockBalance] = useState('0');
  const [totalContribution, setTotalContribution] = useState('0');
  const [currentCap, setCurrentCap] = useState('0');
  const [startTime, setStartTime] = useState(1644681600);
  const [endTime, setEndTime] = useState(1644768000);
  const [isRedeemEnabled, setIsRedeemEnabled] = useState(false);
  const [globalMaximumContribution, setGlobalMaximulContribution] =
    useState('0');
  const [totalRaised, setTotalRaised] = useState('0');
  const [refetch, setRefetch] = useState(false);
  const [isRedeemLoading, setIsRedeemLoading] = useState(false);
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
        // await handleGetFrock();

        await handleGetTotalContribution();

        await handleGetStartTime();
        await handleGetEndTime();

        await handleGetIsRedeemEnabled();

        await handleGetCurrentCap();

        await handleGetMaxContribution();
        await handleGetTotalRaised();

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
    const nrtBalanceResult = await communityOfferingNRT.balanceOf(accounts[0]);
    setNRTBalance(formatUnits(nrtBalanceResult, FROCK_DECIMALS));
  };

  // const handleGetFrock = async () => {
  //   const frockBalanceResult = await frockContract.balanceOf(accounts[0]);
  //   setFrockBalance(formatUnits(frockBalanceResult, FROCK_DECIMALS));
  // };

  const handleGetIsRedeemEnabled = async () => {
    const isRedeemEnabledResult = await communityOffering.redeemEnabled();
    setIsRedeemEnabled(isRedeemEnabledResult);
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
      await handleRefetch(true);
      ToastSuccess('Your transaction has been processed!');
    } catch (error) {
      const errorMsg = error.data.message;
      ToastError(handleCommunityDepositErr(errorMsg));
    }
  };

  const handleRedeem = async () => {
    try {
      setIsRedeemLoading(true);
      const tx = await communityOffering.redeem();
      await tx.wait();
      await handleRefetch(true);
      ToastSuccess('Your transaction has been processed!');
    } catch (error) {
      const errorMsg = error.data.message;
      ToastError(handleCommunityRedeemErr(errorMsg));
    } finally {
      setIsRedeemLoading(false);
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference =
      Date.UTC(2022, 1, 14, 16) -
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      );

    if (difference <= 0) {
      return null;
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

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
              Fractional Rocket Community Sale -{' '}
              {startTimeUtc.utc().format('MMM. Do, h:mm a UTC')}
            </h1>
          </Col>
          <Col lg={4}>
            {startTime !== null && isAfterStartTime && (
              <CountdownUI
                countdown={timeLeft}
                className="float-lg-end"
                type="Community Sale"
                isFinish
              />
            )}
          </Col>
        </Row>
        <p>
          Please read all details here:&nbsp;
          <a
            href="https://medium.com/@fr0ck/fractional-rocket-community-sale-in-depth-16b1703bbfcb"
            className="text-red-dark text-decoration-underline"
            target="_blank"
          >
            Fractional Rocket Community Sale — in depth.
          </a>
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
              prices={{
                startPrice: '0',
                currentPrice: '0',
                finalPrice: '0',
              }}
              isSaleFinished
            />
          </Col>
          <Col lg={5}>
            <CardBalance
              communitySale
              usdcBalance={usdcBalance}
              nrtBalance={nrtBalance}
              frockBalance={frockBalance}
            />
            <CardDeposit
              communitySale
              startTime={startTime}
              endTime={endTime}
              isRedeemEnabled={isRedeemEnabled}
              totalContribution={totalContribution}
              maxContribution={currentCap}
              handleDeposit={handleDeposit}
              handleRedeem={handleRedeem}
              nrtBalance={nrtBalance}
              prices={{
                startPrice: '0',
                currentPrice: '0',
                finalPrice: '0',
              }}
              isRedeemLoading={isRedeemLoading}
            />
            {/* <CommunityList /> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
