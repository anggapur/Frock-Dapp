import React from 'react';
import { Col, Row } from 'react-bootstrap';

import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import styles from './card-frock.module.scss';

export default function CardFrock() {
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
        <Col xl={6} lg={12} xs={6} className="mb-xl-0 mb-lg-4">
          <Card ellipse="top-right">
            <h6>Total building trade dividends</h6>
            <p className={styles.bigger}>350 $FROCK</p>
            <p>$ 138.15</p>
          </Card>
        </Col>
        <Col xl={6} lg={12} xs={6}>
          <Card ellipse="top-right">
            <h6>Total treasury value</h6>
            <p className={styles.bigger}>80 $STRONG</p>
            <p>$ 32,000.00</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}
