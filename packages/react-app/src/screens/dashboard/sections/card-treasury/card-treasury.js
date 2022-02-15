import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import moment from 'moment';

import { GetFantomPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import { LAST_TREASURY_DIVIDEND_DISTRIBUTION } from '../../../../constants';
import styles from './card-treasury.module.scss';

function Column({ children }) {
  return <Col xs={6}>{children}</Col>;
}

export default function CardTreasury() {
  const [fantomPrice, setFantomPrice] = useState(0);

  useEffect(() => {
    GetFantomPrice()
      .then(price => setFantomPrice(price))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Treasury dividends</Card.Header>
      <Row>
        <Column>
          <h6>Last treasury dividend distribution</h6>
        </Column>
        <Column>
          <p className={styles.strong}>
            {moment(LAST_TREASURY_DIVIDEND_DISTRIBUTION).format('L')}
          </p>
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
            <p>
              ${' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
              }).format(fantomPrice * 27)}
            </p>
          </Column>
        </Row>
      </Card.Footer>
    </Card>
  );
}
