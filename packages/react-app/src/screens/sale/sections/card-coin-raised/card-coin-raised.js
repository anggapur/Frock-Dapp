/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { formatUnits } from '@ethersproject/units';
import clsx from 'clsx';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';

import timeSymbol from '../../../../assets/time-symbol.svg';
import Card from '../../../../components/card/card';
import { FROCK_DECIMALS } from '../../../../constants';
import {
  converSecondsToHours,
  getPercentageFromHour,
  renderNumberFormatter,
} from '../../../../utils';
import styles from './card-coin-raised.module.scss';
import shadowCircle from './shadow-circle.svg';

export default function CardCoinRaised({
  communitySale = false,
  isSaleFinished = false,
  startTime,
  endTime,
  totalLimit,
  maxContribution,
  totalInvestors,
  totalRaised,
  prices,
  investedPerPerson,
}) {
  const getPercentage = (Number(totalRaised) / Number(totalLimit)) * 100;
  const [precent, setPrecent] = useState(getPercentage);
  const getCurrentTimezone = moment.tz.guess();
  const currentTimeUtc = moment(new Date()).utc();
  const startTimeUtc = moment.unix(startTime).tz(getCurrentTimezone);
  const endTimeUtc = moment.unix(endTime).tz(getCurrentTimezone);

  const isAfterStartTime = moment(new Date()).isSameOrAfter(startTimeUtc);

  const [elapsedTime, setElapsedTime] = useState(0);
  const duration =
    startTime !== null
      ? moment(currentTimeUtc).diff(startTimeUtc, 'seconds')
      : 0;
  const endDuration = moment(endTimeUtc).diff(startTimeUtc, 'seconds');
  const [_progressBarPrecent, setProgressBarPrecent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const circleRef = useRef();

  const calculation = (investedPerPerson * 10 ** 9) / prices.finalPrice;

  const calculateFrock =
    investedPerPerson !== '0' &&
    prices.finalPrice !== '0' &&
    !Number.isNaN(calculation)
      ? formatUnits(calculation.toString(), FROCK_DECIMALS)
      : 0;

  useEffect(() => {
    if (
      currentTimeUtc.isSameOrAfter(startTimeUtc) &&
      currentTimeUtc.isSameOrBefore(endTimeUtc) &&
      elapsedTime <= endDuration
    ) {
      const intervalId = setInterval(() => {
        setElapsedTime(duration);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [elapsedTime, duration, endDuration]);

  useEffect(() => {
    setPrecent(getPercentage);
  }, [totalRaised, totalLimit]);

  useEffect(() => {
    if (currentTimeUtc.isSame(startTimeUtc)) {
      setProgressBarPrecent((elapsedTime / endDuration) * 100);
    }
  }, [elapsedTime]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    if (precent <= 100 && precent >= 0) {
      setProgress(precent);
    }
  }, [precent, width]);

  return (
    <Card lineBottom={!communitySale ? 'light' : ''}>
      <div
        className={clsx(styles.main, communitySale ? styles.communitySale : '')}
      >
        <div className={styles.startEnd}>
          {startTime !== null && (
            <div className={styles.timeWrapper}>
              <img src={timeSymbol} alt="time symbol" />
              <div>
                <h4>Start Time:</h4>
                <p>{startTimeUtc.format('DD MMM. h:mm A zz')}</p>
                <span>{startTimeUtc.utc().format('DD MMM. h:mm A UTC')}</span>
              </div>
            </div>
          )}
          {endTime !== null && (
            <div className={styles.timeWrapper}>
              <img src={timeSymbol} alt="time symbol" />
              <div>
                <h4>End Time:</h4>
                <p>{endTimeUtc.format('DD MMM. h:mm A zz')}</p>
                <span>{endTimeUtc.utc().format('DD MMM. h:mm A UTC')}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.totalWrapper}>
          <img
            src={shadowCircle}
            className={communitySale ? styles.shadowEnd : styles.shadowStart}
            alt="shadow circle"
          />
          <div className={styles.circle1}>
            <svg className={styles.progressRing}>
              <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cb2d3e" />
                  <stop offset="100%" stopColor="#ef473a" />
                </linearGradient>
              </defs>
              <circle
                className={styles.progressRingShadow}
                fill="transparent"
                stroke="#f2ebeb"
                r={width <= 576 ? 115 : 137}
                cx="50%"
                cy="50%"
              />
              <circle
                ref={circleRef}
                className={styles.progressRingCircle}
                fill="transparent"
                stroke="url(#linear)"
                r={width <= 576 ? 115 : 137}
                cx="50%"
                cy="50%"
              />
            </svg>
            <div className={styles.circle3}>
              <h4>Total raised so far</h4>
              <h2>${renderNumberFormatter(totalRaised)}</h2>
              <h3>
                $
                {Number(totalLimit).toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}{' '}
                Limit
              </h3>
            </div>
          </div>
        </div>
        <ProgressBar
          elapsed={converSecondsToHours(duration)}
          precent={getPercentageFromHour(
            Math.floor(Number(duration) / 3600),
            24,
          )}
          type={communitySale ? 'Community Sale' : 'Public Sale'}
          isFinish={isSaleFinished}
        />
        {startTime !== null && isAfterStartTime && (
          <p className={styles.bottomBar}>
            Maximum Contribution:{' '}
            {communitySale
              ? Number(maxContribution) <= 800
                ? renderNumberFormatter(maxContribution)
                : '800'
              : renderNumberFormatter(maxContribution)}{' '}
            $USDC
          </p>
        )}
      </div>
      {!communitySale && (
        <Row className={clsx(styles.priceWrapper, 'gx-5')}>
          <Col xl={6} className={styles.priceBorder}>
            <Row>
              <Col xs={8}>
                <h4>Starting $bFROCK Price:</h4>
              </Col>
              <Col xs={4}>
                <p>$ {renderNumberFormatter(prices.startPrice)}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={6}>
            <Row>
              <Col xs={8}>
                <h4>Current $bFROCK Price:</h4>
              </Col>
              <Col xs={4}>
                <p>$ {renderNumberFormatter(prices.currentPrice)}</p>
              </Col>
            </Row>
          </Col>
          <Col xl={6} className={styles.priceBorder}>
            <Row>
              <Col xs={8}>
                <h4>Total # investors in Public Sale:</h4>
              </Col>
              <Col xs={4}>
                <p>
                  {Number(totalInvestors).toLocaleString('en-US', {
                    maximumFractionDigits: 0,
                  })}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xl={6}>
            <Row>
              <Col xs={8}>
                <h4>Your balance at current Price:</h4>
              </Col>
              <Col xs={4}>
                <p>{renderNumberFormatter(calculateFrock)} $bFROCK</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Card>
  );
}

function ProgressBar({ elapsed, precent, type, isFinish = false }) {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressBar}>
        <div
          className={clsx(
            styles.progressBarValue,
            precent > 90 ? styles.full : '',
          )}
          style={{
            width: `${precent}%`,
          }}
        />
        <p
          style={{
            mixBlendMode: `${precent === 100 ? 'normal' : 'difference'}`,
          }}
        >
          {!isFinish ? `${elapsed} elapsed` : `${type} finished`}
        </p>
      </div>
    </div>
  );
}
