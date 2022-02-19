/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import { formatUnits } from '@ethersproject/units';
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
import Loading from '../../../../components/loading/loading';
import Tooltip from '../../../../components/tooltip/tooltip';
import { FROCK_DECIMALS } from '../../../../constants';
import { useProvider } from '../../../../hooks/ethers/provider';
import { useStore } from '../../../../hooks/useStore';
import { CommunityOfferingSchema } from '../../../../schemas/CommunityOfferingSchema';
import { renderNumberFormatter } from '../../../../utils';
import styles from './card-deposit.module.scss';

export default function CardDeposit({
  communitySale = false,
  startTime,
  endTime,
  isRedeemEnabled,
  isClaimEnabled,
  totalContribution,
  maxContribution,
  totalApproved,
  handleApproveDeposit,
  handleDeposit,
  handleWithdraw,
  handleRedeem,
  handleClaim,
  hasClaimed,
  isApproveUsdcLoading,
  isClaimBFrockLoading,
  isRedeemLoading,
  prices,
  investedPerPerson,
}) {
  const store = useStore();
  const provider = useProvider();
  const startTimeUtc = moment.unix(startTime).utc();
  const endTimeUtc = moment.unix(endTime).utc();
  const isBeforeStartTime = moment(new Date()).isSameOrBefore(startTimeUtc);
  const isAfterStartTime = moment(new Date()).isSameOrAfter(startTimeUtc);
  const isBeforeEndTime = moment(new Date()).isSameOrBefore(endTimeUtc);
  const isAfterEndTime = moment(new Date()).isSameOrAfter(endTimeUtc);
  const [selected, setSelected] = useState('deposit');
  const [buttonLoading, setButtonLoading] = useState(null);

  const calculation =
    (investedPerPerson * 10 ** 9) / prices.finalPrice / 10 ** 9;

  const calculateFrock =
    investedPerPerson !== '0' &&
    prices.finalPrice !== '0' &&
    !Number.isNaN(calculation)
      ? calculation.toString()
      : '0';

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
    onSubmit: async (data, { resetForm }) => {
      setButtonLoading(selected);

      try {
        if (selected === 'deposit') {
          await handleDeposit(data.depositAmount);
        }

        if (selected === 'withdraw') {
          await handleWithdraw(data.withdrawAmount);
        }

        resetForm();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }

      setButtonLoading(null);
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
    if (maxContribution !== '0' && communitySale) {
      let newMaxContribution = Number(maxContribution);
      if (Number(maxContribution) >= 800) newMaxContribution = 800;
      const newMaxValue =
        Number(newMaxContribution) - Number(totalContribution);
      formik.setFieldValue(field, newMaxValue);
    }

    if (maxContribution !== '0' && !communitySale) {
      let maxValue = 0;
      if (Number(maxContribution) >= Number(store.usdcBalance)) {
        maxValue = Number(store.usdcBalance);
      } else {
        maxValue = Number(maxContribution);
      }
      formik.setFieldValue(field, maxValue);
    }

    if (selected === 'withdraw') {
      if (!communitySale) {
        formik.setFieldValue(field, Number(totalContribution));
      }
    }
    return null;
  };

  const _handleApproveDeposit = async depositAmount => {
    setButtonLoading('approve usdc');
    try {
      await handleApproveDeposit(depositAmount);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    setButtonLoading(null);
  };

  const renderDeposit = () => {
    if (isBeforeEndTime) {
      return (
        <>
          <p>
            Maximum Contribution: {renderNumberFormatter(maxContribution)} $USDC{' '}
            {communitySale && (
              <span style={{ display: 'inline-flex' }}>
                <Tooltip>
                  <ul className="ps-3">
                    <li>First 6 hours max total per person investment: $100</li>
                    <li>
                      Second 6 hours max total per person investment: $200
                    </li>
                    <li>Third 6 hours max total per person investment: $400</li>
                    <li>
                      Fourth 6 hours max total per person investment: $800
                    </li>
                  </ul>
                  Example: <br />
                  If 80 investors invest $100 (and the others do not take part)
                  $2,000 remains of the $ 10,000 hard cap. <br />
                  Once the first 6 hour period finishes, 20 people can top-up
                  with $100 to increase their investment to $200. <br />
                  If after the second period of 6 hours, the maximum of is still
                  not reached, people can top-up with $200 (making their total
                  $400)
                </Tooltip>
              </span>
            )}
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
                disabled={Number(totalApproved) <= 0}
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
              variant={
                !provider &&
                Number(totalApproved) > 0 &&
                Number(totalApproved) <= Number(9999)
                  ? 'disabled'
                  : 'primary'
              }
              onClick={() => _handleApproveDeposit(formik.values.depositAmount)}
              className={styles.button}
              disabled={
                !provider &&
                Number(totalApproved) > 0 &&
                Number(totalApproved) <= Number(9999)
              }
              isRounded
            >
              {renderButtonText('Approve USDC')}
            </RoundButton>
            <RoundButton
              variant={
                Number(totalApproved) > 0 &&
                Number(totalApproved) <= Number(9999)
                  ? 'primary'
                  : 'disabled'
              }
              className={styles.button}
              type="submit"
              disabled={
                Number(totalApproved) <= 0 ||
                Number(totalApproved) > Number(9999) ||
                buttonLoading === 'deposit'
              }
              isRounded
            >
              {renderButtonText('Deposit')}
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
        disabled
        isRounded
      >
        {isBeforeStartTime && communitySale && 'Community sale not started yet'}
        {isAfterEndTime && communitySale && 'Community sale finished'}
        {isBeforeStartTime && !communitySale && 'Public sale not started yet'}
        {isAfterEndTime && !communitySale && 'Public sale finished'}
      </RoundButton>
    );
  };

  const renderButtonText = name => {
    const loadingName = String(name).toLocaleLowerCase();
    if (
      buttonLoading === loadingName ||
      (loadingName === 'approve usdc' && isApproveUsdcLoading) ||
      (loadingName === 'claim $bfrock' && isClaimBFrockLoading) ||
      (loadingName === 'redeem $bfrock for $frock' && isRedeemLoading)
    ) {
      return <Loading variant="light" size="34" style={{ flex: 1 }} />;
    }

    return name;
  };

  const renderWithdraw = () => {
    if (isBeforeEndTime) {
      return (
        <>
          <p>
            Maximum Contribution:{' '}
            {communitySale
              ? Number(maxContribution) <= 800
                ? renderNumberFormatter(maxContribution)
                : '800'
              : renderNumberFormatter(totalContribution)}{' '}
            $USDC
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
              {renderButtonText('Withdraw')}
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
        disabled
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
      <h3>Your total Contribution</h3>
      <h2>{renderNumberFormatter(totalContribution)} $USDC</h2>
      <br />
      <h3>Your claimable $bFROCK</h3>
      <h2>
        {hasClaimed ? '0' : renderNumberFormatter(calculateFrock)} $bFROCK
      </h2>
      <RoundButton
        onClick={isClaimEnabled && !hasClaimed ? handleClaim : () => null}
        variant={isClaimEnabled && !hasClaimed ? 'primary' : 'disabled'}
        className={styles.button}
        disabled={!isClaimEnabled || hasClaimed}
        isRounded
      >
        {renderButtonText('Claim $bFROCK')}
      </RoundButton>
    </>
  );

  const renderRedeem = () => (
    <>
      <h3>You have </h3>
      <h2>
        {renderNumberFormatter(store.nrtBalance)}{' '}
        {communitySale ? '$aFROCK' : '$bFROCK'}
      </h2>
      <RoundButton
        onClick={
          isRedeemEnabled && Number(store.nrtBalance) !== 0
            ? handleRedeem
            : () => null
        }
        variant={
          isRedeemEnabled && Number(store.nrtBalance) !== 0
            ? 'primary'
            : 'disabled'
        }
        className={styles.button}
        disabled={!isRedeemEnabled || Number(store.nrtBalance) === 0}
        isRounded
      >
        {provider
          ? isRedeemEnabled
            ? Number(store.nrtBalance) !== 0
              ? communitySale
                ? 'Redeem $aFROCK for $FROCK'
                : renderButtonText('Redeem $bFROCK for $FROCK')
              : `You have no ${
                  communitySale ? '$aFROCK' : '$bFROCK'
                } in your wallet`
            : 'Redeeming not yet possible'
          : 'Please connect your wallet'}
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
        {communitySale === false && isAfterEndTime && (
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
            <h3>Your total Contribution</h3>
            <h2>{renderNumberFormatter(totalContribution)} $USDC</h2>
            {renderDeposit()}
          </>
        )}
        {selected === 'withdraw' && !communitySale && (
          <>
            <h3>
              Your total Contribution{' '}
              <Tooltip>
                To prevent price manipulation, you can withdraw a maximum of $
                1,000 per hour.
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
