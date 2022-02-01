import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import clsx from 'clsx';

import Card from '../../../../components/card/card';
import styles from './card-coin-raised.module.scss';

export default function CardCoinRaised({
  communitySale = false,
  _startTime,
  _endTime,
  _globalMaximumContribution,
  _totalRaised,
}) {
  const [precent] = useState(75);
  const [width, setWidth] = useState(window.innerWidth);

  const circleRef = useRef();

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
          <div className={styles.timeWrapper}>
            <TimeSymbol />
            <div>
              <h4>Start Time:</h4>
              <p>28 Dec. 17:00 UTC</p>
            </div>
          </div>
          <div className={styles.timeWrapper}>
            <TimeSymbol />
            <div>
              <h4>End Time:</h4>
              <p>30 Dec. 17:00 UTC</p>
            </div>
          </div>
        </div>
        <div className={styles.totalWrapper}>
          <ShadowCircle
            className={communitySale ? styles.shadowEnd : styles.shadowStart}
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
              <h2>$00.000.000</h2>
              <h3>$10M Limit</h3>
            </div>
          </div>
        </div>
        <ProgressBar />
        <p className={styles.bottomBar}>Maximum Contribution: 24,574.54 $FTM</p>
      </div>
      {!communitySale && (
        <Row className={clsx(styles.priceWrapper, 'gx-5')}>
          <Col lg={6} className={styles.priceBorder}>
            <div className={styles.price}>
              <h4>Starting $Frock Price</h4>
              <p>0.08 $</p>
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.price}>
              <h4>Current $bFROCK Price:</h4>
              <p>0.12 $</p>
            </div>
          </Col>
        </Row>
      )}
    </Card>
  );
}

function ProgressBar({ precent }) {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressBar}>
        <div
          className={clsx(
            styles.progressBarValue,
            precent > 90 ? styles.full : '',
          )}
        />
        <p>3 hours 14 min elapsed</p>
      </div>
    </div>
  );
}

function TimeSymbol() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.27179 0C2.36143 0 0 2.375 0 5.30208C0 8.22917 2.36143 10.6094 5.27179 10.6094C8.18214 10.6094 10.5488 8.23438 10.5488 5.30729H5.27179V0Z"
        fill="white"
      />
    </svg>
  );
}

function ShadowCircle({ className }) {
  return (
    <svg
      width="177"
      height="208"
      viewBox="0 0 177 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.1" filter="url(#filter0_d_0_1)">
        <path
          d="M88 102C88 148.392 50.3919 186 4 186C-42.3919 186 -80 148.392 -80 102C-80 55.6081 -42.3919 18 4 18C50.3919 18 88 55.6081 88 102Z"
          fill="white"
        />
      </g>
      <path
        opacity="0.2"
        d="M177 102L88 102"
        stroke="#F1EBEB"
        strokeWidth="5"
      />
      <defs>
        <filter
          id="filter0_d_0_1"
          x="-100"
          y="0"
          width="208"
          height="208"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
