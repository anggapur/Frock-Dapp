import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { formatUnits } from '@ethersproject/units';
import {
  COMMUNITY_OFFERING_ADDR,
  CommunityOfferingABI,
  USDC_ADDR,
  USDCoinABI,
} from '@project/contracts/src/address';

import Countdown from '../../../components/countdown/countdown';
import { USDC_DECIMALS } from '../../../constants/index';
import { useWeb3Accounts } from '../../../hooks/ethers/account';
import { useContract } from '../../../hooks/ethers/contracts';
import { useProvider } from '../../../hooks/ethers/provider';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';
import CommunityList from '../sections/community-list/community-list';

export default function CommunitySale() {
  const [usdcBalance, setUsdcBalance] = useState('00.00');
  const [totalContribution, setTotalContribution] = useState('0');
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
  );

  useEffect(() => {
    (async () => {
      if (provider && accounts) {
        const usdcBalanceResult = await usdCoin.balanceOf(accounts[0]);
        setUsdcBalance(formatUnits(usdcBalanceResult, USDC_DECIMALS));

        const totalContributionResult = await communityOffering.investorInfoMap(
          accounts[0],
        );
        setTotalContribution(
          formatUnits(totalContributionResult.amountInvested, USDC_DECIMALS),
        );

        // const globalMaximumContributonResult =
        //   await communityOffering.totalraiseCap();
        // setGlobalMaximulContribution(globalMaximumContributonResult);

        // const totalRaisedResult = await communityOffering.totalraised();
        // setTotalRaised(totalRaisedResult);
      }
    })();
  }, [provider, accounts]);

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
          <CardCoinRaised communitySale />
        </Col>
        <Col lg={5}>
          <CardBalance usdcBalance={usdcBalance} />
          <CardDeposit totalContribution={totalContribution} />
          <CommunityList />
        </Col>
      </Row>
    </Container>
  );
}
