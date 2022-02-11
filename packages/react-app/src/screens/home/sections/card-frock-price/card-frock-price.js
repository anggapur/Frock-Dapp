import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import clsx from 'clsx';

import Card from '../../../../components/card/card';
import Tooltip from '../../../../components/tooltip/tooltip';
import {
  FROCK_SUPPLY,
  GAS_FEE_FOR_CLAIM,
  GAS_FEE_FOR_CREATE,
  GROWTH_IN_PRICE,
  LINK_VOLUME_PER_PRICE,
} from '../../../../constants';
import styles from './card-frock-price.module.scss';

export default function CardFrockPrice({
  calc: {
    frocPrice,
    precentReflection,
    ftmPrice,
    precentYourPortfolio,
    yourEntryPrice,
    precentClaimPeriod,
    precentReturn,
    precentMarketingWallet,
    strongPrice,
    nodesCount,
    strongReturn,
    precentCompound,
    precentTreasury,
    dailyVolume,
  },
  volumeUsed,
  yearReturn,
  returnFromTreasury,
  amountInvested,
}) {
  const [frockMarketCap, setFrockMarketCap] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [totalPaidReflections] = useState(23000);
  // eslint-disable-next-line no-unused-vars
  const [totalPaid] = useState(80050);
  const [last24HourVolume, setLast24HourVolume] = useState(volumeUsed);
  const [last24HourVolumeReflections, setLast24HourVolumeReflections] =
    useState(0);
  const [yourApr, setYourApr] = useState(0);
  const [returnOnInvestment, setReturnOnInvestment] = useState(0);

  // get frock market cap value
  useEffect(() => {
    setFrockMarketCap(Number(FROCK_SUPPLY * frocPrice));
  }, [frocPrice]);

  // get last 24 hour volume value
  useEffect(() => {
    setLast24HourVolume(volumeUsed);
  }, [volumeUsed]);

  // get last 24 hour volume reflections value
  useEffect(() => {
    const _precentReflection = precentReflection / 100;
    const _last24HourVolumeReflections = Number(
      (last24HourVolume * _precentReflection) / ftmPrice,
    );
    setLast24HourVolumeReflections(_last24HourVolumeReflections);
  }, [last24HourVolume, precentReflection, ftmPrice]);

  // get your APR
  useEffect(() => {
    const _precentYourPortfolio = precentYourPortfolio / 100;
    const invested = _precentYourPortfolio * FROCK_SUPPLY * yourEntryPrice;

    const returnsFromReflections = yearReturn;
    const totalReturns = returnsFromReflections + returnFromTreasury;

    setYourApr(totalReturns / invested);
  }, [precentYourPortfolio, yourEntryPrice, yearReturn, returnFromTreasury]);

  // get return on investment value
  useEffect(() => {
    const _yourEntryPrice = yourEntryPrice < 0.01 ? 0.01 : yourEntryPrice;
    const _precentYourPortfolio =
      amountInvested / (FROCK_SUPPLY * _yourEntryPrice);
    const _dailyVolume = dailyVolume < 1000 ? 1000 : dailyVolume;

    function getYourReflectionsOnDay(day) {
      const _precentClaimPeriod = precentClaimPeriod / 100;
      const _precentReflection = precentReflection / 100;
      const linkedDailyVolume = _dailyVolume * (1 + GROWTH_IN_PRICE / 10);
      const _volumeUsed =
        LINK_VOLUME_PER_PRICE === 1 ? linkedDailyVolume : _dailyVolume;

      return (
        _precentClaimPeriod *
        _precentYourPortfolio *
        _volumeUsed *
        _precentReflection *
        day
      );
    }

    function getYourTreasuryReturnOnDay(day) {
      const _precentReturn = precentReturn / 100;
      const _precentMarketingWallet = precentMarketingWallet / 100;

      function getCumulativeStrongTotalByDay() {
        let nodes = nodesCount;
        let balance = 0;
        let costToClaim = 0;
        let payout = 0;
        let cumulativeStrongTotal = 0;
        const rewardPerDay = strongReturn;
        const _precentCompound = precentCompound / 100;
        const _precentTreasury = precentTreasury / 100;
        const treasuryBuildupPerDay = _dailyVolume * _precentTreasury;

        const getBalance = (
          _balance,
          _nodes,
          minusValue = 0,
          _costToClaim = 0,
        ) => {
          _balance =
            _balance -
            minusValue +
            _nodes * rewardPerDay * _precentCompound +
            treasuryBuildupPerDay / strongPrice;

          if (_balance > 10) {
            _balance -= _costToClaim / strongPrice;
          }

          return _balance;
        };

        for (let d = 1; d <= day; d++) {
          if (d === 1) {
            balance = nodes * rewardPerDay;
            costToClaim =
              parseInt(balance / 10) === 1
                ? nodes * GAS_FEE_FOR_CLAIM + GAS_FEE_FOR_CREATE
                : 0;
          } else {
            if (balance <= 10) {
              balance = getBalance(balance, nodes);
            } else {
              if (balance <= 20) {
                balance = getBalance(balance, nodes, 10, costToClaim);
              } else if (balance <= 30) {
                balance = getBalance(balance, nodes, 20, costToClaim);
              } else if (balance <= 40) {
                balance = getBalance(balance, nodes, 30, costToClaim);
              } else if (balance <= 50) {
                balance = getBalance(balance, nodes, 40, costToClaim);
              } else if (balance <= 60) {
                balance = getBalance(balance, nodes, 50, costToClaim);
              } else if (balance <= 70) {
                balance = getBalance(balance, nodes, 60, costToClaim);
              } else if (balance <= 80) {
                balance = getBalance(balance, nodes, 70, costToClaim);
              } else if (balance <= 90) {
                balance = getBalance(balance, nodes, 80, costToClaim);
              } else if (balance <= 100) {
                balance = getBalance(balance, nodes, 90, costToClaim);
              } else if (balance <= 110) {
                balance = getBalance(balance, nodes, 100, costToClaim);
              } else if (balance <= 120) {
                balance = getBalance(balance, nodes, 110, costToClaim);
              } else if (balance <= 130) {
                balance = getBalance(balance, nodes, 120, costToClaim);
              } else if (balance <= 140) {
                balance = getBalance(balance, nodes, 130, costToClaim);
              } else if (balance <= 150) {
                balance = getBalance(balance, nodes, 140, costToClaim);
              } else if (balance <= 160) {
                balance = getBalance(balance, nodes, 150, costToClaim);
              } else if (balance <= 170) {
                balance = getBalance(balance, nodes, 160, costToClaim);
              }

              if (d > 3) {
                nodes += parseInt(balance / 10);
              }
            }

            costToClaim =
              parseInt(balance / 10) > 0
                ? nodes * GAS_FEE_FOR_CLAIM + GAS_FEE_FOR_CREATE
                : 0;
          }

          payout = nodes * rewardPerDay;
          cumulativeStrongTotal =
            day === 1 ? payout : payout + cumulativeStrongTotal;
        }

        return cumulativeStrongTotal;
      }

      const lastDayTreasuryNetReturn =
        getCumulativeStrongTotalByDay() * strongPrice;

      const returnedValue =
        lastDayTreasuryNetReturn *
        _precentReturn *
        (1 - _precentMarketingWallet);

      return returnedValue * _precentYourPortfolio;
    }

    let isGetDay = false;
    let day = 1;
    while (!isGetDay) {
      const _amountInvested =
        _precentYourPortfolio * FROCK_SUPPLY * yourEntryPrice;
      const _yourReflectionOnDays = getYourReflectionsOnDay(day);
      const _yourTreasuryReturn = getYourTreasuryReturnOnDay(day);

      if (
        _amountInvested <= _yourReflectionOnDays + _yourTreasuryReturn ||
        day > 365
      ) {
        setReturnOnInvestment(day);
        isGetDay = true;
      }

      day += 1;
    }
  }, [
    amountInvested,
    dailyVolume,
    nodesCount,
    precentClaimPeriod,
    precentCompound,
    precentMarketingWallet,
    precentReflection,
    precentReturn,
    precentTreasury,
    strongPrice,
    strongReturn,
    yourEntryPrice,
  ]);

  return (
    <>
      <Card
        ellipse="top-left"
        lineBottom="primary"
        className="global-card-frock-price-1"
      >
        <Row>
          <Col xs={6} className="pb-3">
            <h3 className={styles.h3}>$FROCK Price</h3>
            <h1 className={styles.h1}>${frocPrice}</h1>
            {/* <RoundButton
              variant="primary"
              className={styles.buyFrock}
              isRounded
              isOutline
            >
              Buy $FRock
            </RoundButton> */}
          </Col>
          <Col xs={6}>
            <h5 className={styles.h5}>
              $FROCK market cap{' '}
              {/* <Tooltip anchorLink="/" anchorText="Read more">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
               malesuada posuere dolor in tempus.
              </Tooltip> */}
            </h5>
            <p className={styles.mb20}>
              ${' '}
              {frockMarketCap.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>

            <h5 className={styles.h5}>
              Total supply
              {/* <Tooltip anchorLink="/" anchorText="Read more">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
               malesuada posuere dolor in tempus.
              </Tooltip> */}
            </h5>
            <p>{FROCK_SUPPLY.toLocaleString('en-US')} $FROCK</p>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col>
          <Card
            lineBottom="light"
            className={clsx(styles.cardApr, 'global-card-frock-price-3 mt-4')}
          >
            <Row>
              <Col xs={6} sm={6} md={6} lg={4} xl={5} xxl={6}>
                <h5 className={styles.h5} style={{ marginBottom: '7px' }}>
                  <strong>Your APR</strong>{' '}
                  <Tooltip
                  // anchorLink="/" anchorText="Read more"
                  >
                    The APR is the % you get as return after 1 year. The return
                    is the sum of your reflections and your treasury returns.
                  </Tooltip>
                </h5>
              </Col>
              <Col xs={6} sm={6} md={6} lg={8} xl={7} xxl={6}>
                <h1
                  className={clsx(styles.h1, styles.yourApr)}
                  style={{ marginBottom: 0 }}
                >
                  {parseInt(yourApr * 100)}%
                </h1>
              </Col>
            </Row>
            <Row className="pt-lg-2">
              <Col xs={6} sm={6} md={6} lg={4} xl={5} xxl={6}>
                <h6 className={styles.h6} style={{ color: '#7e7a7a' }}>
                  Return on Investment
                </h6>
              </Col>
              <Col xs={6} sm={6} md={6} lg={8} xl={7} xxl={6}>
                <p className={styles.p}>
                  {returnOnInvestment <= 365 ? returnOnInvestment : '> 365'}{' '}
                  {returnOnInvestment > 1 ? 'days' : 'day'}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        {/* <Col xs={6}>
          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-3 mt-4"
          >
            <h5 className={styles.h5}>
              Last 24 Hour Volume{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>
              ${' '}
              {last24HourVolume.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        </Col>
        <Col xs={6}>

            <h5 className={styles.h5}>
              Total paid reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>
              $FTM{' '}
              {totalPaid.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
            <small>
              ${' '}
              {totalPaidReflections.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </small>

          <Card
            ellipse="top-right"
            lineBottom="light"
            className="global-card-frock-price-3 mt-4"
          >
            <h5 className={styles.h5}>
              Last 24 Hour reflections{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h5>
            <p>
              $FTM{' '}
              {last24HourVolumeReflections.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
            </p>
          </Card>
        </Col> */}
      </Row>
    </>
  );
}
