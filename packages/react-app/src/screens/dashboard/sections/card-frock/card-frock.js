import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import {
  GetFantomPrice,
  GetFrockMarketChart,
  GetFrockPrice,
  GetStrongPrice,
} from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import Tooltip from '../../../../components/tooltip/tooltip';
import { FROCK_SUPPLY } from '../../../../constants';
import { TOTAL_TREASURY_VALUE_IN_STRONG } from '../../../../constants/treasuryStatus';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-frock.module.scss';

export default function CardFrock({ frockPrice: frockPriceDex, tokenBalance }) {
  const [frockPrice, setFrockPrice] = useState(0);
  const [frockMarketCap, setFrockMarketCap] = useState(0);
  const [fantomPrice, setFantomPrice] = useState(0);
  const [strongPrice, setStrongPrice] = useState(0);

  useEffect(() => {
    Promise.all([
      GetFrockPrice(),
      GetStrongPrice(),
      GetFantomPrice(),
      GetFrockMarketChart(),
    ])
      .then(price => {
        setFrockPrice(price[0]);
        setStrongPrice(price[1]);
        setFantomPrice(price[2]);

        if (price[3]?.market_caps && Array.isArray(price[3]?.market_caps)) {
          const marketCaps = price[3].market_caps.pop();
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
            <h1>
              $
              {renderNumberFormatter(
                (Number(frockPriceDex) * fantomPrice).toString(),
              )}
            </h1>
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
              }).format(FROCK_SUPPLY * (Number(frockPriceDex) * fantomPrice))}
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
          xxl={6}
          lg={12}
          xs={6}
          className="d-flex align-items-stretch mb-xxl-0 mb-lg-4"
        >
          <Card ellipse="top-right">
            <h6>
              Total building trade dividends{' '}
              <Tooltip>
                Trade dividends which are not yet claimable. All $FTM and $
                prices are based on current rates, not historical earnings.
              </Tooltip>
            </h6>
            <Row>
              <Col
                xxl={12}
                xl={6}
                lg={7}
                xs={12}
                className="d-flex align-items-stretch"
              >
                <p className={styles.bigger}>
                  {renderNumberFormatter(Number(tokenBalance))} FTM
                </p>
              </Col>
              <Col
                xxl={12}
                xl={6}
                lg={5}
                xs={12}
                className="d-flex align-items-stretch"
              >
                <p>
                  ${' '}
                  {renderNumberFormatter(
                    (Number(tokenBalance) * fantomPrice).toString(),
                  )}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xxl={6} lg={12} xs={6} className="d-flex align-items-stretch">
          <Card ellipse="top-right">
            <h6>
              Total treasury value{' '}
              <Tooltip>$ price is based on current rate.</Tooltip>
            </h6>
            <Row>
              <Col
                xxl={12}
                xl={6}
                lg={7}
                xs={12}
                className="d-flex align-items-stretch"
              >
                <p className={styles.bigger}>
                  {TOTAL_TREASURY_VALUE_IN_STRONG / 10} $STRONG NODES
                </p>
              </Col>
              <Col
                xxl={12}
                xl={6}
                lg={5}
                xs={12}
                className="d-flex align-items-stretch"
              >
                <p>
                  ${' '}
                  {new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(strongPrice * TOTAL_TREASURY_VALUE_IN_STRONG)}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
