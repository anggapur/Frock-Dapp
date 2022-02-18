import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GetFantomPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import styles from './card-trade.module.scss';

function Column({ children, isDescription = false, ...rest }) {
  return (
    <Col
      xl={isDescription ? 7 : 5}
      lg={isDescription ? 8 : 4}
      xs={isDescription ? 7 : 5}
      {...rest}
    >
      {children}
    </Col>
  );
}

export default function CardTrade({ buildTradeDividend, handleClaim }) {
  const [fantomPrice, setFantomPrice] = useState(0);

  useEffect(() => {
    GetFantomPrice()
      .then(price => setFantomPrice(price))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Trade dividends</Card.Header>
      <Row>
        <Column isDescription>
          <h6>Your building trade dividends</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>$FTM 30.50</p>
          <p>$ 100.20</p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column isDescription>
          <h6>Your claimable trade dividends</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>$FTM 130.50</p>
          <p>$ 300.20</p>
        </Column>
      </Row>
      <RoundButton
        variant="primary"
        className="mt-4 w-100"
        isRounded
        onClick={() => handleClaim(0)}
      >
        Claim
      </RoundButton>
      <Card.Footer className={styles.footer}>
        <Row>
          <Column isDescription>
            <h6>Your total claimed trade dividends</h6>
          </Column>
          <Column className="ps-xl-2 px-lg-0">
            <p className={styles.strong}>$FTM 127.00</p>
            <p>
              ${' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
              }).format(fantomPrice * 127)}
            </p>
          </Column>
        </Row>
      </Card.Footer>
    </Card>
  );
}
