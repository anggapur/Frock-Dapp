import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import clsx from 'clsx';

import Card from '../../../../components/card/card';
import Tooltip from '../../../../components/tooltip/tooltip';
import { FROCK_SUPPLY } from '../../../../constants';
import styles from './card-balance.module.scss';

export default function CardBalance({
  calc: {
    precentClaimPeriod,
    precentYourPortfolio,
    precentReflection,
    days,
    ftmPrice,
    yourEntryPrice,
    dailyVolume,
  },
  volumeUsed,
  yearReturn,
  returnFromTreasury,
}) {
  const [pending, setPending] = useState(0);
  const [reflections, setReflections] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [claimable, setClaimable] = useState(0);
  const [yourApr, setYourApr] = useState(0);
  const [totalReflections, setTotalReflections] = useState(0);

  // calculate reflections value
  useEffect(() => {
    const _precentClaimPeriod = precentClaimPeriod / 100;
    const _precentYourPortfolio = precentYourPortfolio / 100;
    const _precentReflection = precentReflection / 100;

    const _reflections =
      _precentClaimPeriod *
      _precentYourPortfolio *
      volumeUsed *
      _precentReflection *
      days;

    setReflections(_reflections);
  }, [
    precentClaimPeriod,
    precentYourPortfolio,
    precentReflection,
    days,
    volumeUsed,
  ]);

  // get your pending and your claimable value
  useEffect(() => {
    const yourPendingValue = reflections / ftmPrice;
    setPending(yourPendingValue);
    setClaimable(yourPendingValue);
  }, [reflections, ftmPrice]);

  // get your APR
  useEffect(() => {
    const _precentYourPortfolio = precentYourPortfolio / 100;
    const invested = _precentYourPortfolio * FROCK_SUPPLY * yourEntryPrice;

    const returnsFromReflections = yearReturn;
    const totalReturns = returnsFromReflections + returnFromTreasury;

    setYourApr(totalReturns / invested);
  }, [precentYourPortfolio, yourEntryPrice, yearReturn, returnFromTreasury]);

  // get total reflections
  useEffect(() => {
    const _precentReflection = precentReflection / 100;
    setTotalReflections(dailyVolume * _precentReflection * days);
  }, [dailyVolume, precentReflection, days]);

  return (
    <>
      <Card
        ellipse="top-left"
        className="global-card-balance-1"
        lineBottom="light"
      >
        <Card.Header>Reflections</Card.Header>
        <Row>
          <Col xs={6} lg={12} xl={6}>
            <h6 className={styles.h6} style={{ color: '#7e7a7a' }}>
              Total {`${days} day`} reflections
            </h6>
          </Col>
          <Col xs={6} lg={12} xl={6}>
            <p className={styles.p}>
              <strong>
                ${' '}
                {totalReflections.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} lg={12} xl={6}>
            <h6 className={styles.h6} style={{ color: '#7e7a7a' }}>
              Ownership share
            </h6>
          </Col>
          <Col xs={6} lg={12} xl={6}>
            <p className={styles.p}>
              <strong>
                {precentYourPortfolio.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}{' '}
                %
              </strong>
            </p>
          </Col>
        </Row>
        <hr className={styles.hr} />
        <Row>
          <Col xs={12}></Col>
          <Col
            xs={6}
            lg={12}
            className="mt-lg-1"
            style={{
              float: 'left',
              color: '#7e7a7a',
              fontSize: '21px',
            }}
          >
            Your {`${days} day`} reflections:
          </Col>
          <Col xs={6} lg={12}>
            <h1 className={clsx(styles.h1, 'mt-lg-3')}>
              ${' '}
              {Number(reflections).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </h1>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={6}>
            <h5 className={styles.h5}></h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>

            </p>
          </Col>
        </Row> */}
        {/* <hr className={styles.hr} /> */}
        {/* <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>Your claimable</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              <strong>
                $FTM{' '}
                {Number(claimable).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h5 className={styles.h5}>reflections</h5>
          </Col>
          <Col xs={6}>
            <p className={styles.p}>
              ${' '}
              {Number(reflections).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </Col>
        </Row> */}
        {/* <RoundButton variant="primary" className="mt-4 w-100" isRounded>
          Claim
        </RoundButton> */}
      </Card>
      {/* <Card
        lineBottom="light"
        className={clsx(styles.cardApr, 'global-card-balance-2 my-4')}
      >
        <Row>
          <Col xs={6} lg={12}>
            <h5 className={clsx(styles.h5, styles.mb7)}>
              <strong>Your APR</strong>{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
          </Col>
          <Col xs={6} lg={12}>
            <h1 className={styles.h1}>{parseInt(yourApr * 100)}%</h1>
          </Col>
        </Row>
      </Card> */}
    </>
  );
}
