import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { isEmpty } from 'lodash';

import { GetFantomPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import { useWeb3Accounts } from '../../../../hooks/ethers/account';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-trade.module.scss';

function Column({ children, isDescription = false, ...rest }) {
  return (
    <Col
      xl={isDescription ? 7 : 5}
      lg={isDescription ? 8 : 4}
      xs={isDescription ? 7 : 5}
      {...rest}
    >
      {children}
    </Col>
  );
}

export default function CardTrade({
  buildTradeDividend,
  claimableDividend,
  totalClaimed,
  handleClaim,
}) {
  const accounts = useWeb3Accounts();
  const [fantomPrice, setFantomPrice] = useState(0);

  useEffect(() => {
    GetFantomPrice()
      .then(price => setFantomPrice(price))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  console.log('buildTradeDividend', buildTradeDividend);

  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Trade dividends</Card.Header>
      <Row>
        <Column isDescription>
          <h6>Your building trade dividends</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>
            FTM {renderNumberFormatter(buildTradeDividend)}
          </p>
          <p>
            ${' '}
            {renderNumberFormatter(
              (fantomPrice * Number(buildTradeDividend)).toString(),
            )}
          </p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column isDescription>
          <h6>Your claimable trade dividends</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>
            FTM {renderNumberFormatter(claimableDividend)}
          </p>
          <p>
            ${' '}
            {renderNumberFormatter(
              (fantomPrice * Number(claimableDividend)).toString(),
            )}
          </p>
        </Column>
      </Row>
      <RoundButton
        variant={
          (accounts === undefined && isEmpty(accounts)) ||
          renderNumberFormatter(claimableDividend) === '0'
            ? 'disabled'
            : 'primary'
        }
        className="mt-4 w-100"
        isRounded
        onClick={
          (accounts === undefined && isEmpty(accounts)) ||
          renderNumberFormatter(claimableDividend) === '0'
            ? () => null
            : () => handleClaim(0)
        }
      >
        Claim
      </RoundButton>
      <Card.Footer className={styles.footer}>
        <Row>
          <Column isDescription>
            <h6>Your total claimed trade dividends</h6>
          </Column>
          <Column className="ps-xl-2 px-lg-0">
            <p className={styles.strong}>
              FTM {renderNumberFormatter(totalClaimed)}
            </p>
            <p>
              ${' '}
              {renderNumberFormatter(
                (fantomPrice * Number(totalClaimed)).toString(),
              )}
            </p>
          </Column>
        </Row>
      </Card.Footer>
    </Card>
  );
}
