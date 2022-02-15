import React from 'react';
import { Col, Row } from 'react-bootstrap';

import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import styles from './card-treasury.module.scss';

function Column({ children }) {
  return <Col xs={6}>{children}</Col>;
}

export default function CardTreasury() {
  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Treasury dividends</Card.Header>
      <Row>
        <Column>
          <h6>Last treasury dividend distribution</h6>
        </Column>
        <Column>
          <p className={styles.strong}>15/02/2022</p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column>
          <h6>Your claimable</h6>
        </Column>
        <Column>
          <p className={styles.strong}>$FTM 13.50</p>
        </Column>
      </Row>
      <Row>
        <Column>
          <h6>treasury dividens</h6>
        </Column>
        <Column>
          <p>$ 30.20</p>
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
            <p className={styles.strong}>$FTM 27.00</p>
          </Column>
        </Row>
        <Row>
          <Column>
            <h6>treasury dividens</h6>
          </Column>
          <Column>
            <p>$ 60.21</p>
          </Column>
        </Row>
      </Card.Footer>
    </Card>
  );
}
