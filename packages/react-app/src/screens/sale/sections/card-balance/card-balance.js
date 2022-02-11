import React from 'react';
import { Col, Row } from 'react-bootstrap';

import frockDarkLogo from '../../../../assets/frock-dark-logo-small.svg';
import frockLogo from '../../../../assets/frock-logo-small.svg';
import usdcLogo from '../../../../assets/usdc-logo-small.svg';
import Card from '../../../../components/card/card';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-balance.module.scss';

export default function CardBalance({
  communitySale = false,
  usdcBalance,
  nrtBalance,
  frockBalance,
}) {
  return (
    <Card className={styles.wrapper}>
      <h2>Balance:</h2>
      <Row>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img src={usdcLogo} alt="USDC logo" />
          <div>
            {renderNumberFormatter(usdcBalance)}
            <p>$USDC</p>
          </div>
        </Col>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img
            src={frockDarkLogo}
            alt={`${communitySale ? 'aFROCK' : 'bFROCK'} logo`}
          />
          <div>
            {renderNumberFormatter(nrtBalance)}
            <p>{communitySale ? '$aFROCK' : '$bFROCK'}</p>
          </div>
        </Col>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img src={frockLogo} alt="FROCK logo" />
          <div>
            {renderNumberFormatter(frockBalance)}
            <p>$FROCK</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
