/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import bfrockLogo from '../../../../assets/bfrock-logo-small.svg';
import afrockLogo from '../../../../assets/frock-dark-logo-small.svg';
import frockLogo from '../../../../assets/frock-logo-small.svg';
import usdcLogo from '../../../../assets/usdc-logo-small.svg';
import Card from '../../../../components/card/card';
import { AFROCK_TOKEN_DATA, BFROCK_TOKEN_DATA } from '../../../../constants';
import { useStore } from '../../../../hooks/useStore';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-balance.module.scss';

export default function CardBalance({ communitySale = false }) {
  const store = useStore();

  const handleAddToken = async tokenData => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenData.address,
          symbol: tokenData.symbol,
          decimals: tokenData.decimals,
          image: tokenData.image,
        },
      },
    });
  };

  return (
    <Card className={styles.wrapper}>
      <h2>Balance:</h2>
      <Row>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img src={usdcLogo} alt="USDC logo" />
          <div>
            {renderNumberFormatter(store.usdcBalance)}
            <p>$USDC</p>
          </div>
        </Col>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img
            src={communitySale ? afrockLogo : bfrockLogo}
            alt={`${communitySale ? 'aFROCK' : 'bFROCK'} logo`}
          />
          <div>
            {renderNumberFormatter(store.nrtBalance)}
            <a
              href="#"
              onClick={() =>
                handleAddToken(
                  communitySale ? AFROCK_TOKEN_DATA : BFROCK_TOKEN_DATA,
                )
              }
            >
              {communitySale ? '$aFROCK' : '$bFROCK'}
            </a>
          </div>
        </Col>
        <Col xl={4} lg={12} xs={4} className={styles['col-xxs-12']}>
          <img src={frockLogo} alt="FROCK logo" />
          <div>
            {renderNumberFormatter(store.frockBalance)}
            <p>$FROCK</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
