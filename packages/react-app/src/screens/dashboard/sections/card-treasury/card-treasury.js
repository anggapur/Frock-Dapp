import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { GetFantomPrice } from '../../../../api';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import Loading from '../../../../components/loading/loading';
import Tooltip from '../../../../components/tooltip/tooltip';
import { LAST_TREASURY_DIVIDEND_DISTRIBUTION } from '../../../../constants/treasuryStatus';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-treasury.module.scss';

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

export default function CardTreasury({
  claimableDividend,
  totalClaimed,
  handleClaim,
  isClaimButtonLoading,
}) {
  const [fantomPrice, setFantomPrice] = useState(0);

  useEffect(() => {
    GetFantomPrice()
      .then(price => setFantomPrice(price))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  return (
    <Card ellipse="top-left" className={styles.wrapper}>
      <Card.Header>Treasury dividends</Card.Header>
      <Row>
        <Column isDescription>
          <h6>Last dividend distribution</h6>
        </Column>
        <Column className="px-xl-2 px-lg-0">
          <p className={styles.strong}>
            {new Intl.DateTimeFormat(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }).format(LAST_TREASURY_DIVIDEND_DISTRIBUTION)}
          </p>
        </Column>
      </Row>
      <hr />
      <Row>
        <Column isDescription>
          <h6>
            Your claimable treasury dividends{' '}
            <Tooltip>
              Your share of the treasury dividends, ready to claim.
              The $ price is based on current rate.
            </Tooltip>
          </h6>
        </Column>
        <Column className="px-xl-2 px-lg-0">
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
          renderNumberFormatter(claimableDividend) === '0'
            ? 'disabled'
            : 'primary'
        }
        className="mt-4 w-100"
        isRounded
        onClick={
          renderNumberFormatter(claimableDividend) === '0'
            ? () => null
            : () => handleClaim(1)
        }
        disabled={renderNumberFormatter(claimableDividend) === '0'}
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
              Your total claimed treasury dividends{' '}
              <Tooltip>
                Your historical amount of treasury dividends claimed.
                The $ price is based on current rate.
              </Tooltip>
            </h6>
          </Column>
          <Column className="px-xl-2 px-lg-0">
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
