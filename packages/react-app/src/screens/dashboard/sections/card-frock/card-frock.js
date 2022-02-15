import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GetStrongPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import { TOTAL_TREASURY_VALUE_IN_STRONG } from '../../../../constants';
import styles from './card-frock.module.scss';

export default function CardFrock() {
  const [strongPrice, setStrongPrice] = useState(0);

  useEffect(() => {
    GetStrongPrice()
      .then(price => setStrongPrice(price))
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
            <h1>$0,3947</h1>
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
            <p>$ 3,947,383</p>
            <h6>Total supply</h6>
            <p>1,000,000 $FROCK</p>
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
            <p>$ 138.15</p>
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
