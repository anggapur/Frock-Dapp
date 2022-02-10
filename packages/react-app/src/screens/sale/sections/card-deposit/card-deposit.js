/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import clsx from 'clsx';
import { useFormik } from 'formik';
import moment from 'moment';

import arrowDownIconGray from '../../../../assets/arrow-down-icon-gray.svg';
import arrowDownIconRed from '../../../../assets/arrow-down-icon-red.svg';
import arrowRightIconGray from '../../../../assets/arrow-right-icon-gray.svg';
import arrowRightIconRed from '../../../../assets/arrow-right-icon-red.svg';
import arrowUpIconGray from '../../../../assets/arrow-up-icon-gray.svg';
import arrowUpIconRed from '../../../../assets/arrow-up-icon-red.svg';
import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import Tooltip from '../../../../components/tooltip/tooltip';
import { useProvider } from '../../../../hooks/ethers/provider';
import { CommunityOfferingSchema } from '../../../../schemas/CommunityOfferingSchema';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-deposit.module.scss';

export default function CardDeposit({
  communitySale = false,
  startTime,
  endTime,
  totalContribution,
  maxContribution,
  handleDeposit,
  handleWithdraw,
  handleRedeem,
  handleClaim,
  frockBalance,
}) {
  const provider = useProvider();
  const startTimeUtc = moment.unix(startTime).utc();
  const endTimeUtc = moment.unix(endTime).utc();
  const protocolLaunchDate = moment('22 February 2022');
  const isBeforeStartTime = moment(new Date()).isSameOrBefore(startTimeUtc);
  const isAfterStartTime = moment(new Date()).isSameOrAfter(startTimeUtc);
  const isBeforeEndTime = moment(new Date()).isSameOrBefore(endTimeUtc);
  const isAfterEndTime = moment(new Date()).isSameOrAfter(endTimeUtc);
  const isAfterLaunch = moment(new Date()).isSameOrAfter(protocolLaunchDate);
  const [selected, setSelected] = useState('deposit');

  useEffect(() => {
    if (communitySale === false && !isBeforeEndTime) {
      return setSelected('redeem');
    }

    return setSelected('deposit');
  }, [isBeforeEndTime]);

  const initialValues = {
    depositAmount: '',
    withdrawAmount: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: CommunityOfferingSchema(selected),
    onSubmit: async data => {
      if (selected === 'deposit') {
        await handleDeposit(data.depositAmount);
      }

      if (selected === 'withdraw') {
        await handleWithdraw(data.withdrawAmount);
      }
    },
  });

  const handleInputChange = (e, field) => {
    const regex = /^(?:[1-9][0-9]*|0)(?:\.\d+)?$/;

    if (e.target.value === '') {
      return formik.setFieldValue(field, '');
    }

    if (regex.test(e.target.value)) {
      return formik.setFieldValue(field, e.target.value);
    }
    return null;
  };

  const handleMaxChange = field => {
    if (maxContribution !== '0') {
      formik.setFieldValue(field, maxContribution);
    }
    return null;
  };

  const renderDeposit = () => {
    if (isAfterStartTime && isBeforeEndTime) {
      return (
        <>
          <p>
            Maximum Contribution: {renderNumberFormatter(maxContribution)} $USDC
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup
              hasValidation
              size="lg"
              className={clsx(
                formik.errors.depositAmount && styles.hasError,
                styles.inputGroup,
              )}
            >
              <FormControl
                required
                type="number"
                aria-label="depositAmount"
                aria-describedby="depositAmount"
                name="depositAmount"
                onChange={e => handleInputChange(e, 'depositAmount')}
                onBlur={formik.handleBlur}
                value={formik.values.depositAmount}
                className={styles.input}
                placeholder="Contribution Amount"
              />
              <InputGroup.Text
                onClick={() => handleMaxChange('depositAmount')}
                id="deposit"
                className={styles.inputSymbol}
              >
                MAX
              </InputGroup.Text>
            </InputGroup>
            {formik.errors.depositAmount && formik.touched.depositAmount ? (
              <div className={clsx('text-danger', styles.errorMessage)}>
                {formik.errors.depositAmount}
              </div>
            ) : null}
            <RoundButton
              variant="primary"
              className={styles.button}
              type="submit"
              isRounded
            >
              Deposit
            </RoundButton>
          </Form>
        </>
      );
    }

    return (
      <RoundButton
        variant="disabled"
        className={clsx(styles.button, 'disabled')}
        onClick={() => null}
        isRounded
      >
        {isBeforeStartTime && communitySale && 'Community sale not started yet'}
        {isAfterEndTime && communitySale && 'Community sale finished'}
        {isBeforeStartTime && !communitySale && 'Public sale not started yet'}
        {isAfterEndTime && !communitySale && 'Public sale finished'}
      </RoundButton>
    );
  };

  const renderWithdraw = () => {
    if (isAfterStartTime && isBeforeEndTime) {
      return (
        <>
          <p>
            Maximum Contribution: {renderNumberFormatter(maxContribution)} $USDC
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup
              hasValidation
              size="lg"
              className={clsx(
                formik.errors.withdrawAmount && styles.hasError,
                styles.inputGroup,
              )}
            >
              <FormControl
                type="number"
                aria-label="withdrawAmount"
                aria-describedby="withdrawAmount"
                name="withdrawAmount"
                onChange={e => handleInputChange(e, 'withdrawAmount')}
                onBlur={formik.handleBlur}
                value={formik.values.withdrawAmount}
                className={styles.input}
                placeholder="Withdraw Amount"
              />
              <InputGroup.Text
                id="withdraw"
                onClick={() => handleMaxChange('withdrawAmount')}
                className={styles.inputSymbol}
              >
                MAX
              </InputGroup.Text>
            </InputGroup>
            {formik.errors.withdrawAmount && formik.touched.withdrawAmount ? (
              <div className={clsx('text-danger', styles.errorMessage)}>
                {formik.errors.withdrawAmount}
              </div>
            ) : null}
            <RoundButton
              variant="primary"
              type="submit"
              className={styles.button}
              isRounded
            >
              Withdraw
            </RoundButton>
          </Form>
        </>
      );
    }

    return (
      <RoundButton
        variant="disabled"
        className={clsx(styles.button, 'disabled')}
        onClick={() => null}
        isRounded
      >
        {isBeforeStartTime && communitySale && 'Community sale not started yet'}
        {isAfterEndTime && communitySale && 'Community sale finished'}
        {isBeforeStartTime && !communitySale && 'Public sale not started yet'}
        {isAfterEndTime && !communitySale && 'Public sale finished'}
      </RoundButton>
    );
  };

  const renderClaim = () => (
    <>
      <h3>
        Your total Contribution{' '}
        <Tooltip anchorLink="/" anchorText="Read more">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          malesuada posuere dolor in tempus.
        </Tooltip>
      </h3>
      <h2>{renderNumberFormatter(totalContribution)} $USDC</h2>
      <br />
      <h3>
        Your claimable $bFROCK{' '}
        <Tooltip anchorLink="/" anchorText="Read more">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          malesuada posuere dolor in tempus.
        </Tooltip>
      </h3>
      <h2>{renderNumberFormatter(frockBalance)} $bFROCK</h2>
      <RoundButton
        onClick={handleClaim}
        variant="primary"
        className={styles.button}
        isRounded
      >
        Claim $bFROCK
      </RoundButton>
    </>
  );

  const renderRedeem = () => (
    <>
      <h3>You have </h3>
      <h2>
        {renderNumberFormatter(frockBalance)}{' '}
        {communitySale ? '$aFROCK' : '$bFROCK'}
      </h2>
      <RoundButton
        onClick={isAfterLaunch ? handleRedeem : () => null}
        variant={isAfterLaunch ? 'primary' : 'disabled'}
        className={styles.button}
        isRounded
      >
        {provider && isAfterLaunch
          ? communitySale
            ? 'Redeem $aFROCK for $FROCK'
            : 'Redeem $bFROCK for $FROCK'
          : 'Redeeming not possible yet'}
      </RoundButton>
    </>
  );

  return (
    <Card lineBottom="light" className={styles.wrapper}>
      <div className={styles.header}>
        {communitySale === false ? (
          isBeforeEndTime && (
            <div
              className={selected === 'deposit' ? styles.selected : ''}
              onClick={() => setSelected('deposit')}
            >
              <img
                src={
                  selected === 'deposit' ? arrowDownIconRed : arrowDownIconGray
                }
                alt="arrow down icon"
              />
              <h2>Deposit</h2>
            </div>
          )
        ) : (
          <div
            className={selected === 'deposit' ? styles.selected : ''}
            onClick={() => setSelected('deposit')}
          >
            <img
              src={
                selected === 'deposit' ? arrowDownIconRed : arrowDownIconGray
              }
              alt="arrow down icon"
            />
            <h2>Deposit</h2>
          </div>
        )}
        {communitySale === false && isBeforeEndTime && (
          <div
            className={selected === 'withdraw' ? styles.selected : ''}
            onClick={() => setSelected('withdraw')}
          >
            <img
              src={selected === 'withdraw' ? arrowUpIconRed : arrowUpIconGray}
              alt="arrow up icon"
            />
            <h2>Withdraw</h2>
          </div>
        )}
        {communitySale === false && !isBeforeEndTime && (
          <div
            className={selected === 'claim' ? styles.selected : ''}
            onClick={() => setSelected('claim')}
          >
            <img
              src={
                selected === 'claim' ? arrowRightIconRed : arrowRightIconGray
              }
              alt="arrow right icon"
            />
            <h2>Claim</h2>
          </div>
        )}
        <div
          className={selected === 'redeem' ? styles.selected : ''}
          onClick={() => setSelected('redeem')}
        >
          <img
            src={selected === 'redeem' ? arrowRightIconRed : arrowRightIconGray}
            alt="arrow right icon"
          />
          <h2>Redeem</h2>
        </div>
      </div>
      <div className={styles.main}>
        {selected === 'deposit' && (
          <>
            <h3>
              Your total Contribution{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h3>
            <h2>{renderNumberFormatter(totalContribution)} $USDC</h2>
            {renderDeposit()}
          </>
        )}
        {selected === 'withdraw' && !communitySale && (
          <>
            <h3>
              Your total Contribution{' '}
              <Tooltip anchorLink="/" anchorText="Read more">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                malesuada posuere dolor in tempus.
              </Tooltip>
            </h3>
            <h2>{renderNumberFormatter(totalContribution)} $USDC</h2>
            {renderWithdraw()}
          </>
        )}
        {selected === 'claim' && renderClaim()}
        {selected === 'redeem' && renderRedeem()}
      </div>
    </Card>
  );
}
