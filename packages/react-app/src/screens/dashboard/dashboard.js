import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import CardFrock from './sections/card-frock/card-frock';
import CardTrade from './sections/card-trade/card-trade';
import CardTreasury from './sections/card-treasury/card-treasury';
import FaqSection from './sections/faq-section/faq-section';

export default function Dashboard() {
  return (
    <Container>
      <Row>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTrade />
        </Col>
        <Col lg={4} className="mb-4">
          <CardFrock />
        </Col>
        <Col lg={4} className="d-flex align-items-stretch mb-4">
          <CardTreasury />
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
