import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import {
  GetFrockMarketChart,
  GetFrockPrice,
  GetStrongPrice,
} from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import {
  FROCK_SUPPLY,
  TOTAL_TREASURY_VALUE_IN_STRONG,
} from '../../../../constants';
import styles from './card-frock.module.scss';

export default function CardFrock() {
  const [frockPrice, setFrockPrice] = useState(0);
  const [frockMarketCap, setFrockMarketCap] = useState(0);
  const [strongPrice, setStrongPrice] = useState(0);

  useEffect(() => {
    Promise.all([GetFrockPrice(), GetStrongPrice(), GetFrockMarketChart()])
      .then(price => {
        setFrockPrice(price[0]);
        setStrongPrice(price[1]);

        if (price[2]?.market_caps && Array.isArray(price[2]?.market_caps)) {
          const marketCaps = price[2].market_caps.pop();
          setFrockMarketCap(marketCaps[1]);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  return (
    <>
      <Card
        ellipse="top-left"
        lineBottom="primary"
        className={styles['card-wrapper']}
      >
        <Row>
          <Col xl={6} lg={12} xs={6}>
            <h3>$FROCK Price</h3>
            <h1>${new Intl.NumberFormat('en-US').format(frockPrice)}</h1>
            <RoundButton
              variant="primary"
              className="mt-3 mb-xl-3 mb-4 px-4"
              isOutline
              isRounded
            >
              Buy $FROCK
            </RoundButton>
          </Col>
          <Col xl={6} lg={12} xs={6} className="my-xl-0 my-lg-2">
            <h6>$FROCK market cap</h6>
            <p>
              ${' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0,
              }).format(frockMarketCap)}
            </p>
            <h6>Total supply</h6>
            <p>
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0,
              }).format(FROCK_SUPPLY)}{' '}
              $FROCK
            </p>
          </Col>
        </Row>
      </Card>

      <Row className={styles['card-on-bottom']}>
        <Col
          xl={6}
          lg={12}
          xs={6}
          className="d-flex align-items-stretch mb-xl-0 mb-lg-4"
        >
          <Card ellipse="top-right">
            <h6>Total building trade dividends</h6>
            <p className={styles.bigger}>350 $FROCK</p>
            <p>
              ${' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
              }).format(frockPrice * 350)}
            </p>
          </Card>
        </Col>
        <Col xl={6} lg={12} xs={6} className="d-flex align-items-stretch">
          <Card ellipse="top-right">
            <h6>Total treasury value</h6>
            <p className={styles.bigger}>
              {TOTAL_TREASURY_VALUE_IN_STRONG} $STRONG
            </p>
            <p>
              ${' '}
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
              }).format(strongPrice * TOTAL_TREASURY_VALUE_IN_STRONG)}
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
}
