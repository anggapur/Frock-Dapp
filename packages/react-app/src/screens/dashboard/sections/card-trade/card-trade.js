import React from 'react';
import { Col, Row } from 'react-bootstrap';

import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import styles from './card-trade.module.scss';

function Column({ children }) {
  return <Col xs={6}>{children}</Col>;
}

export default function CardTrade() {
  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Trade dividends</Card.Header>
      <Row>
        <Column>
          <h6>Your building</h6>
        </Column>
        <Column>
          <p className={styles.strong}>$FTM 30.50</p>
        </Column>
      </Row>
      <Row>
        <Column>
          <h6>trade dividens</h6>
        </Column>
        <Column>
          <p>$ 100.20</p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column>
          <h6>Your claimable</h6>
        </Column>
        <Column>
          <p className={styles.strong}>$FTM 130.50</p>
        </Column>
      </Row>
      <Row>
        <Column>
          <h6>trade dividens</h6>
        </Column>
        <Column>
          <p>$ 300.20</p>
        </Column>
      </Row>
      <RoundButton variant="primary" className="mt-4 w-100" isRounded>
        Claim
      </RoundButton>
      <Card.Footer className={styles.footer}>
        <Row>
          <Column>
            <h6>Your total claimed</h6>
          </Column>
          <Column>
            <p className={styles.strong}>$FTM 127.00</p>
          </Column>
        </Row>
        <Row>
          <Column>
            <h6>trade dividens</h6>
          </Column>
          <Column>
            <p>$ 250.21</p>
          </Column>
        </Row>
      </Card.Footer>
    </Card>
  );
}
