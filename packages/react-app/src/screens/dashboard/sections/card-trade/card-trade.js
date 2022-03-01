import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { isEmpty } from 'lodash';

import { GetFantomPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import Loading from '../../../../components/loading/loading';
import Tooltip from '../../../../components/tooltip/tooltip';
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
  isClaimButtonLoading,
  lastRewardShare,
  rewardAmountTrade,
}) {
  const accounts = useWeb3Accounts();
  const [fantomPrice, setFantomPrice] = useState(0);

  useEffect(() => {
    GetFantomPrice()
      .then(price => setFantomPrice(price))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Trade dividends</Card.Header>
      <Row>
        <Column isDescription>
          <h6>Last trade dividend distribution</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>
            {new Intl.DateTimeFormat(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(lastRewardShare)}
          </p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column isDescription>
          <h6>Total trade dividend distribution</h6>
        </Column>
        <Column className="ps-xl-2 px-lg-0">
          <p className={styles.strong}>
            FTM {renderNumberFormatter(rewardAmountTrade)}
          </p>
          <p>
            ${' '}
            {renderNumberFormatter(
              (fantomPrice * Number(rewardAmountTrade)).toString(),
            )}
          </p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column isDescription>
          <h6>
            Your claimable trade dividends{' '}
            <Tooltip>
              Your share of the trade dividends, ready to claim!
            </Tooltip>
          </h6>
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
        disabled={
          (accounts === undefined && isEmpty(accounts)) ||
          renderNumberFormatter(claimableDividend) === '0'
        }
      >
        {!isClaimButtonLoading ? (
          'Claim'
        ) : (
          <Loading variant="light" size="34" style={{ flex: 1 }} />
        )}
      </RoundButton>
      <Card.Footer className={styles.footer}>
        <Row>
          <Column isDescription>
            <h6>
              Your total claimed trade dividends{' '}
              <Tooltip>
                Your historical amount of trade dividends claimed.
              </Tooltip>
            </h6>
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
