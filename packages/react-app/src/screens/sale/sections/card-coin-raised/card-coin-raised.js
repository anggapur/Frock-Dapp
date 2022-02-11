import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import clsx from 'clsx';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';

import timeSymbol from '../../../../assets/time-symbol.svg';
import Card from '../../../../components/card/card';
import {
  converSecondsToHours,
  handleKFormatter,
  renderNumberFormatter,
} from '../../../../utils';
import styles from './card-coin-raised.module.scss';
import shadowCircle from './shadow-circle.svg';

export default function CardCoinRaised({
  communitySale = false,
  startTime,
  endTime,
  totalLimit,
  maxContribution,
  totalRaised,
  prices,
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
  const [progressBarPrecent, setProgressBarPrecent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const circleRef = useRef();

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
                {totalLimit.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}{' '}
                Limit
              </h3>
            </div>
          </div>
        </div>
        <ProgressBar
          elapsed={converSecondsToHours(duration)}
          precent={progressBarPrecent}
        />
        {startTime !== null && isAfterStartTime && (
          <p className={styles.bottomBar}>
            Maximum Contribution: {renderNumberFormatter(maxContribution)} $USDC
          </p>
        )}
      </div>
      {!communitySale && (
        <Row className={clsx(styles.priceWrapper, 'gx-5')}>
          <Col lg={6} className={styles.priceBorder}>
            <div className={styles.price}>
              <h4>Starting $bFROCK Price</h4>
              <p>{renderNumberFormatter(prices.startPrice)} $</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.price}>
              <h4>Current $bFROCK Price:</h4>
              <p>{renderNumberFormatter(prices.currentPrice)} $</p>
            </div>
          </Col>
        </Row>
      )}
    </Card>
  );
}

function ProgressBar({ elapsed, precent }) {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressBar}>
        <div
          className={clsx(
            styles.progressBarValue,
            precent > 90 ? styles.full : '',
          )}
          style={{ width: `${precent}%` }}
        />
        <p>{elapsed} elapsed</p>
      </div>
    </div>
  );
}
