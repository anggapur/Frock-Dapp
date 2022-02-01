import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { _CommunityOffering } from '@project/contracts/src/address';

import Countdown from '../../../components/countdown/countdown';
import { _useContract } from '../../../hooks/ethers/contracts';
import '../sale.scss';
import CardBalance from '../sections/card-balance/card-balance';
import CardCoinRaised from '../sections/card-coin-raised/card-coin-raised';
import CardDeposit from '../sections/card-deposit/card-deposit';
import CommunityList from '../sections/community-list/community-list';

export default function CommunitySale() {
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
          <CardBalance />
          <CardDeposit />
          <CommunityList />
        </Col>
      </Row>
    </Container>
  );
}
