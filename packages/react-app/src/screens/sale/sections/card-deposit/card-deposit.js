/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import clsx from 'clsx';
import { useFormik } from 'formik';
import moment from 'moment';

import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import Tooltip from '../../../../components/tooltip/tooltip';
import { useProvider } from '../../../../hooks/ethers/provider';
import { CommunityOfferingSchema } from '../../../../schemas/CommunityOfferingSchema';
import styles from './card-deposit.module.scss';

export default function CardDeposit({
  communitySale = false,
  endTime,
  totalContribution,
  maxContribution,
  handleDeposit,
  handleWithdraw,
  handleRedeem,
  frockBalance,
}) {
  const provider = useProvider();
  const endTimeUtc = moment.unix(endTime).utc();
  const protocolLaunchDate = moment('22 February 2022');
  const isBeforeEndTime = moment(new Date()).isSameOrBefore(endTimeUtc);
  const isAfterLaunch = moment(new Date()).isSameOrAfter(protocolLaunchDate);
  const [selected, setSelected] = useState('deposit');

  useEffect(() => {
    if (communitySale === false && isBeforeEndTime) {
      return setSelected('deposit');
    }

    return setSelected('redeem');
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
    if (isBeforeEndTime) {
      return (
        <>
          <p>Maximum Contribution: {maxContribution} $USDC</p>
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
        Community sale finished
      </RoundButton>
    );
  };

  const renderWithdraw = () => (
    <>
      <p>Maximum Contribution: {maxContribution} $USDC</p>
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

  const renderClaim = () => (
    <>
      <h3>
        Your total Contribution{' '}
        <Tooltip anchorLink="/" anchorText="Read more">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          malesuada posuere dolor in tempus.
        </Tooltip>
      </h3>
      <h2>{totalContribution} $USDC</h2>
      <br />
      <h3>
        Your claimable $bFROCK{' '}
        <Tooltip anchorLink="/" anchorText="Read more">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          malesuada posuere dolor in tempus.
        </Tooltip>
      </h3>
      <h2>{frockBalance} $bFROCK</h2>
      <RoundButton
        onClick={() => null}
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
        {frockBalance} {communitySale ? '$aFROCK' : '$bFROCK'}
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
              <svg
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.19832 15C5.93454 14.9275 5.74834 14.7518 5.55827 14.5686C3.81269 12.8468 2.06711 11.1288 0.317645 9.41079C-0.0120759 9.08628 -0.109052 8.68923 0.13145 8.36854C0.356436 8.07075 0.635729 7.80351 0.934417 7.57445C1.20207 7.36829 1.59774 7.42937 1.86151 7.64698C1.91582 7.68898 1.96625 7.73861 2.0128 7.78824C3.0136 8.77704 4.0144 9.76584 5.01908 10.7546C5.05787 10.7928 5.09666 10.8272 5.15872 10.8806C5.15872 10.7966 5.15872 10.7394 5.15872 10.6821C5.15872 7.44082 5.15873 4.19954 5.15873 0.958259C5.15873 0.335963 5.4962 0.00381693 6.13237 -5.73409e-07C6.32633 -5.56453e-07 6.52028 -0.0038181 6.71423 -5.22541e-07C7.17584 0.0114531 7.5172 0.33978 7.54047 0.797912C7.54435 0.855178 7.54047 0.916263 7.54047 0.973529C7.54047 4.19572 7.54047 7.41792 7.54047 10.6401C7.54047 10.6974 7.54047 10.7546 7.54047 10.8425C7.59866 10.789 7.63745 10.7585 7.67236 10.7241C8.68092 9.7353 9.6856 8.74268 10.6942 7.75388C11.0161 7.44082 11.4351 7.34156 11.757 7.57826C12.0596 7.79969 12.3311 8.07457 12.56 8.36854C12.7733 8.64342 12.7113 9.02138 12.4863 9.29244C12.4436 9.34589 12.3932 9.39552 12.3428 9.44133C10.6049 11.1555 8.86324 12.8659 7.12541 14.58C6.9431 14.7633 6.75302 14.9313 6.497 15C6.39615 15 6.29917 15 6.19832 15Z"
                  fill={selected === 'deposit' ? '#CB2D3E' : '#7E7A7A'}
                />
              </svg>
              <h2>Deposit</h2>
            </div>
          )
        ) : (
          <div
            className={selected === 'deposit' ? styles.selected : ''}
            onClick={() => setSelected('deposit')}
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.19832 15C5.93454 14.9275 5.74834 14.7518 5.55827 14.5686C3.81269 12.8468 2.06711 11.1288 0.317645 9.41079C-0.0120759 9.08628 -0.109052 8.68923 0.13145 8.36854C0.356436 8.07075 0.635729 7.80351 0.934417 7.57445C1.20207 7.36829 1.59774 7.42937 1.86151 7.64698C1.91582 7.68898 1.96625 7.73861 2.0128 7.78824C3.0136 8.77704 4.0144 9.76584 5.01908 10.7546C5.05787 10.7928 5.09666 10.8272 5.15872 10.8806C5.15872 10.7966 5.15872 10.7394 5.15872 10.6821C5.15872 7.44082 5.15873 4.19954 5.15873 0.958259C5.15873 0.335963 5.4962 0.00381693 6.13237 -5.73409e-07C6.32633 -5.56453e-07 6.52028 -0.0038181 6.71423 -5.22541e-07C7.17584 0.0114531 7.5172 0.33978 7.54047 0.797912C7.54435 0.855178 7.54047 0.916263 7.54047 0.973529C7.54047 4.19572 7.54047 7.41792 7.54047 10.6401C7.54047 10.6974 7.54047 10.7546 7.54047 10.8425C7.59866 10.789 7.63745 10.7585 7.67236 10.7241C8.68092 9.7353 9.6856 8.74268 10.6942 7.75388C11.0161 7.44082 11.4351 7.34156 11.757 7.57826C12.0596 7.79969 12.3311 8.07457 12.56 8.36854C12.7733 8.64342 12.7113 9.02138 12.4863 9.29244C12.4436 9.34589 12.3932 9.39552 12.3428 9.44133C10.6049 11.1555 8.86324 12.8659 7.12541 14.58C6.9431 14.7633 6.75302 14.9313 6.497 15C6.39615 15 6.29917 15 6.19832 15Z"
                fill={selected === 'deposit' ? '#CB2D3E' : '#7E7A7A'}
              />
            </svg>
            <h2>Deposit</h2>
          </div>
        )}
        {communitySale === false && isBeforeEndTime && (
          <div
            className={selected === 'withdraw' ? styles.selected : ''}
            onClick={() => setSelected('withdraw')}
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.49309 0C6.75687 0.0725375 6.94306 0.248155 7.13314 0.431408C8.87872 2.15322 10.6243 3.87121 12.3738 5.58921C12.7035 5.91372 12.8005 6.31077 12.56 6.63146C12.335 6.92924 12.0557 7.19649 11.757 7.42555C11.4893 7.63171 11.0937 7.57063 10.8299 7.35302C10.7756 7.31102 10.7252 7.26139 10.6786 7.21176C9.67781 6.22296 8.67701 5.23416 7.67233 4.24536C7.63354 4.20718 7.59475 4.17282 7.53268 4.11937C7.53268 4.20336 7.53268 4.26063 7.53268 4.31789C7.53268 7.55918 7.53268 10.8005 7.53268 14.0417C7.53268 14.664 7.1952 14.9962 6.55904 15C6.36508 15 6.17113 15.0038 5.97718 15C5.51557 14.9885 5.17421 14.6602 5.15093 14.2021C5.14705 14.1448 5.15093 14.0837 5.15093 14.0265C5.15093 10.8043 5.15093 7.58208 5.15093 4.35989C5.15093 4.30262 5.15093 4.24536 5.15093 4.15755C5.09275 4.211 5.05396 4.24154 5.01904 4.2759C4.01049 5.2647 3.00581 6.25732 1.99725 7.24612C1.67529 7.55918 1.25635 7.65844 0.934384 7.42174C0.631816 7.20031 0.360281 6.92543 0.131416 6.63146C-0.0819328 6.35658 -0.0198677 5.97862 0.205118 5.70756C0.247788 5.65411 0.298216 5.60448 0.348644 5.55867C2.08647 3.84449 3.82817 2.13413 5.56599 0.419954C5.74831 0.236701 5.93838 0.0687198 6.1944 0C6.29526 0 6.39224 0 6.49309 0Z"
                fill={selected === 'withdraw' ? '#CB2D3E' : '#7E7A7A'}
              />
            </svg>
            <h2>Withdraw</h2>
          </div>
        )}
        {communitySale === false && !isBeforeEndTime && (
          <div
            className={selected === 'claim' ? styles.selected : ''}
            onClick={() => setSelected('claim')}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8477 6.64714C13.7751 6.91092 13.5995 7.09712 13.4162 7.28719C11.6944 9.03277 9.97644 10.7784 8.25845 12.5278C7.93394 12.8575 7.53689 12.9545 7.2162 12.714C6.91841 12.489 6.65117 12.2097 6.4221 11.911C6.21594 11.6434 6.27703 11.2477 6.49464 10.9839C6.53663 10.9296 6.58627 10.8792 6.6359 10.8327C7.6247 9.83186 8.6135 8.83106 9.6023 7.82638C9.64048 7.78759 9.67484 7.7488 9.72829 7.68673C9.6443 7.68673 9.58703 7.68673 9.52976 7.68673C6.28848 7.68673 3.0472 7.68673 -0.194084 7.68673C-0.816381 7.68673 -1.14853 7.34926 -1.15234 6.71309C-1.15234 6.51913 -1.15616 6.32518 -1.15234 6.13123C-1.14089 5.66962 -0.812563 5.32826 -0.354431 5.30499C-0.297165 5.30111 -0.23608 5.30499 -0.178814 5.30499C3.04338 5.30499 6.26557 5.30499 9.48777 5.30499C9.54503 5.30499 9.6023 5.30499 9.69011 5.30499C9.63666 5.2468 9.60612 5.20801 9.57176 5.1731C8.58296 4.16454 7.59034 3.15986 6.60154 2.1513C6.28848 1.82934 6.18922 1.4104 6.42592 1.08844C6.64735 0.785869 6.92223 0.514334 7.2162 0.285469C7.49108 0.0721197 7.86904 0.134185 8.1401 0.359171C8.19355 0.401841 8.24318 0.452269 8.28899 0.502696C10.0032 2.24052 11.7135 3.98222 13.4277 5.72005C13.611 5.90236 13.7789 6.09244 13.8477 6.34846C13.8477 6.44931 13.8477 6.54629 13.8477 6.64714Z"
                fill={selected === 'claim' ? '#CB2D3E' : '#7E7A7A'}
              />
            </svg>
            <h2>Claim</h2>
          </div>
        )}
        <div
          className={selected === 'redeem' ? styles.selected : ''}
          onClick={() => setSelected('redeem')}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8477 6.64714C13.7751 6.91092 13.5995 7.09712 13.4162 7.28719C11.6944 9.03277 9.97644 10.7784 8.25845 12.5278C7.93394 12.8575 7.53689 12.9545 7.2162 12.714C6.91841 12.489 6.65117 12.2097 6.4221 11.911C6.21594 11.6434 6.27703 11.2477 6.49464 10.9839C6.53663 10.9296 6.58627 10.8792 6.6359 10.8327C7.6247 9.83186 8.6135 8.83106 9.6023 7.82638C9.64048 7.78759 9.67484 7.7488 9.72829 7.68673C9.6443 7.68673 9.58703 7.68673 9.52976 7.68673C6.28848 7.68673 3.0472 7.68673 -0.194084 7.68673C-0.816381 7.68673 -1.14853 7.34926 -1.15234 6.71309C-1.15234 6.51913 -1.15616 6.32518 -1.15234 6.13123C-1.14089 5.66962 -0.812563 5.32826 -0.354431 5.30499C-0.297165 5.30111 -0.23608 5.30499 -0.178814 5.30499C3.04338 5.30499 6.26557 5.30499 9.48777 5.30499C9.54503 5.30499 9.6023 5.30499 9.69011 5.30499C9.63666 5.2468 9.60612 5.20801 9.57176 5.1731C8.58296 4.16454 7.59034 3.15986 6.60154 2.1513C6.28848 1.82934 6.18922 1.4104 6.42592 1.08844C6.64735 0.785869 6.92223 0.514334 7.2162 0.285469C7.49108 0.0721197 7.86904 0.134185 8.1401 0.359171C8.19355 0.401841 8.24318 0.452269 8.28899 0.502696C10.0032 2.24052 11.7135 3.98222 13.4277 5.72005C13.611 5.90236 13.7789 6.09244 13.8477 6.34846C13.8477 6.44931 13.8477 6.54629 13.8477 6.64714Z"
              fill={selected === 'redeem' ? '#CB2D3E' : '#7E7A7A'}
            />
          </svg>
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
            <h2>{totalContribution} $USDC</h2>
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
            <h2>{totalContribution} $USDC</h2>
            {renderWithdraw()}
          </>
        )}
        {selected === 'claim' && renderClaim()}
        {selected === 'redeem' && renderRedeem()}
      </div>
    </Card>
  );
}
