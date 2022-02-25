import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import RoundButton from '../../../../components/button/button';
import Card from '../../../../components/card/card';
import { FROCK_SUPPLY } from '../../../../constants';
import styles from './calculator.module.scss';
import FormRangeInput from './form-range-input';

export default function Calculator({
  calc,
  setCalc,
  strongPriceFromApi,
  ftmPriceFromApi,
  handleSetAmountInvested,
}) {
  const [amountInvested, setAmountInvested] = useState(400);
  const [isSimplifiedModel, setIsSimplifiedModel] = useState(true);

  useEffect(() => {
    handleSetAmountInvested(amountInvested);
  }, [amountInvested]);

  useEffect(() => {
    const precentYourPortfolio =
      (amountInvested / (FROCK_SUPPLY * calc.yourEntryPrice)) * 100;
    setCalc({ ...calc, precentYourPortfolio });
  }, [amountInvested, calc.yourEntryPrice]);

  useEffect(() => {
    setCalc({
      ...calc,
      precentReflection: 21 - calc.precentTreasury,
    });
  }, [calc.precentTreasury]);

  useEffect(() => {
    setCalc({
      ...calc,
      precentTreasury: 21 - calc.precentReflection,
    });
  }, [calc.precentReflection]);

  useEffect(() => {
    setCalc({
      ...calc,
      precentReturn: 100 - calc.precentCompound,
    });
  }, [calc.precentCompound]);

  useEffect(() => {
    setCalc({
      ...calc,
      precentCompound: 100 - calc.precentReturn,
    });
  }, [calc.precentReturn]);

  const handleResetClicked = () => {
    setCalc({
      ftmPrice: ftmPriceFromApi,
      dailyVolume: 20000,
      precentClaimPeriod: 100,
      precentReflection: 7,
      precentTreasury: 14,
      frocPrice: 0.12,
      yourEntryPrice: 0.20,
      precentYourPortfolio: 0.5,
      precentCompound: 67,
      precentReturn: 33,
      precentMarketingWallet: 0,
      days: 365,
      strongPrice: strongPriceFromApi,
      strongReturn: 0.085,
      nodesCount: 7,
    });
    setAmountInvested(400);
  };

  const handleOnChange = (state, value) => {
    setCalc({
      ...calc,
      [state]: value,
    });
  };

  return (
    <Card ellipse="top-left">
      <RoundButton
        className="float-end"
        variant="light"
        size="small"
        isRounded
        onClick={handleResetClicked}
      >
        Reset
      </RoundButton>
      <Card.Header>Launch Calculator</Card.Header>
      <Form.Check
        type="switch"
        id="simplified-model"
        label="Simplified model"
        className={styles.checkboxSimplified}
        checked={isSimplifiedModel}
        onChange={e => setIsSimplifiedModel(e.currentTarget.checked)}
      />
      <Row>
        {isSimplifiedModel ? (
          <>
            <Col lg={4}>
              <FormRangeInput
                label="Daily Volume"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={1000}
                maxValue={100000}
                step={5000}
                value={calc.dailyVolume}
                setValue={value => handleOnChange('dailyVolume', value)}
                currencyFormat
              />
            </Col>
            <Col lg={4}>
              <FormRangeInput
                label="Amount invested"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={100}
                maxValue={2500}
                step={100}
                value={amountInvested}
                setValue={value => setAmountInvested(value)}
                currencyFormat
              />
            </Col>
            <Col lg={4}>
              <FormRangeInput
                label="Your entry price"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={0.01}
                maxValue={1.0}
                step={0.01}
                value={calc.yourEntryPrice}
                setValue={value => handleOnChange('yourEntryPrice', value)}
                currencyFormat
              />
            </Col>
          </>
        ) : (
          <>
            <Col lg={4}>
              {/* <FormRangeInput
            label="FTM price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={20}
            value={calc.ftmPrice}
            setValue={value => handleOnChange('ftmPrice', value)}
            currencyFormat
            hideBar
          /> */}
              <FormRangeInput
                label="Daily Volume"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={1000}
                maxValue={100000}
                step={5000}
                value={calc.dailyVolume}
                setValue={value => handleOnChange('dailyVolume', value)}
                currencyFormat
              />
              <FormRangeInput
                label="Period"
                symbol={{ label: 'Days', position: 'end' }}
                type="number"
                minValue={1}
                maxValue={365}
                value={calc.days}
                setValue={value => handleOnChange('days', value)}
              />
              <FormRangeInput
                label="$STRONG price"
                tooltip={{
                  text: 'The average $STRONG price during the period and year (for APR calculations).',
                }}
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={1}
                maxValue={1000}
                value={calc.strongPrice}
                setValue={value => handleOnChange('strongPrice', value)}
                currencyFormat
              />
              <FormRangeInput
                label="Strong returns"
                tooltip={{
                  text: 'For simplicity in the calculator, this number should take the incurred gas fees into account. The 0.085 value starting value is taking 0.06 (7%) for gas fees from the current 0.091 daily returns.',
                }}
                type="text"
                minValue={0.01}
                maxValue={0.09}
                step={0.005}
                value={calc.strongReturn}
                setValue={value => handleOnChange('strongReturn', value)}
              />
              {/* <FormRangeInput
            label="% of claim period"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentClaimPeriod}
            setValue={value => handleOnChange('precentClaimPeriod', value)}
          /> */}
            </Col>
            <Col lg={4}>
              <FormRangeInput
                label="$FROCK price"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={0.01}
                maxValue={2.5}
                step={0.01}
                value={calc.frocPrice}
                setValue={value => handleOnChange('frocPrice', value)}
                currencyFormat
              />
              {/* <FormRangeInput
            label="Ownership share"
            type="text"
            symbol={{ label: '%', position: 'end' }}
            minValue={0.01}
            maxValue={2.5}
            step={0.01}
            value={calc.precentYourPortfolio}
            setValue={value => handleOnChange('precentYourPortfolio', value)}
            currencyFormat
          /> */}
              <FormRangeInput
                label="Amount invested"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={100}
                maxValue={2500}
                step={100}
                value={amountInvested}
                setValue={value => setAmountInvested(value)}
                currencyFormat
              />
              <FormRangeInput
                label="Your entry price"
                type="text"
                symbol={{ label: '$', position: 'start' }}
                minValue={0.01}
                maxValue={1.0}
                step={0.01}
                value={calc.yourEntryPrice}
                setValue={value => handleOnChange('yourEntryPrice', value)}
                currencyFormat
              />
              <FormRangeInput
                label="Nodes launch"
                tooltip={{
                  text: 'The number of nodes in treasury at the start of the calculator period. The full amount raised during public sale will buy 4 $STRONG nodes.',
                }}
                type="number"
                minValue={1}
                maxValue={50}
                value={calc.nodesCount}
                setValue={value => handleOnChange('nodesCount', value)}
              />
            </Col>
            <Col lg={4}>
              {/* <FormRangeInput
            label="Marketing/dev wallet"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentMarketingWallet}
            setValue={value => handleOnChange('precentMarketingWallet', value)}
          /> */}
              <FormRangeInput
                label="Reflection tax"
                tooltip={{
                  text: 'The % of each transaction that goes to reflections, short term 1 time rewards. The Fractional Rocket team might change parameters going forward.',
                }}
                type="number"
                symbol={{ label: '%', position: 'end' }}
                minValue={0}
                maxValue={21}
                value={calc.precentReflection}
                setValue={value => handleOnChange('precentReflection', value)}
              />
              <FormRangeInput
                label="Treasury tax"
                tooltip={{
                  text: 'The % of each transaction that goes to the treasury, long term recurring rewards. The Fractional Rocket team might change parameters going forward.',
                }}
                type="number"
                symbol={{ label: '%', position: 'end' }}
                minValue={0}
                maxValue={21}
                value={calc.precentTreasury}
                setValue={value => handleOnChange('precentTreasury', value)}
              />
              <FormRangeInput
                label="Compound"
                tooltip={{
                  text: 'The % of the treasury that is reinvested in the treasury, increasing the long term recurring rewards. The Fractional Rocket team might change parameters going forward.',
                }}
                type="number"
                symbol={{ label: '%', position: 'end' }}
                minValue={0}
                maxValue={100}
                value={calc.precentCompound}
                setValue={value => handleOnChange('precentCompound', value)}
              />
              <FormRangeInput
                label="Return"
                tooltip={{
                  text: 'The % of the treasury that is returned to the holders, either to liquidity/buyback and burn or added to the $FTM passive income of holders. The Fractional Rocket team might change parameters going forward.',
                }}
                type="number"
                symbol={{ label: '%', position: 'end' }}
                minValue={0}
                maxValue={100}
                value={calc.precentReturn}
                setValue={value => handleOnChange('precentReturn', value)}
              />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
}
