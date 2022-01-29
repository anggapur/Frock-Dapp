import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import FormRangeInput from './form-range-input'

export default function Calculator({
  calc,
  setCalc,
  strongPriceFromApi,
  ftmPriceFromApi,
}) {
  useEffect(() => {
    setCalc({
      ...calc,
      precentReflection: 21 - calc.precentTreasury,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.precentTreasury])

  useEffect(() => {
    setCalc({
      ...calc,
      precentTreasury: 21 - calc.precentReflection,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.precentReflection])

  useEffect(() => {
    setCalc({
      ...calc,
      precentReturn: 100 - calc.precentCompound,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.precentCompound])

  useEffect(() => {
    setCalc({
      ...calc,
      precentCompound: 100 - calc.precentReturn,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.precentReturn])

  const handleResetClicked = () => {
    setCalc({
      ftmPrice: ftmPriceFromApi,
      dailyVolume: 50000,
      precentClaimPeriod: 100,
      precentReflection: 7,
      precentTreasury: 14,
      frocPrice: 0.12,
      yourEntryPrice: 0.094,
      precentYourPortfolio: 1,
      precentCompound: 67,
      precentReturn: 33,
      precentMarketingWallet: 0,
      days: 31,
      strongPrice: strongPriceFromApi,
      strongReturn: 0.085,
      nodesCount: 2,
    })
  }

  const handleOnChange = (state, value) => {
    setCalc({
      ...calc,
      [state]: value,
    })
  }

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
      <Row>
        <Col lg={4}>
          {/* <FormRangeInput
            label="FTM price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={20}
            value={calc.ftmPrice}
            setValue={value => handleOnChange('ftmPrice', value)}
            currencyFormat={true}
            hideBar={true}
          /> */}
          <FormRangeInput
            label="Daily Volume"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={100000}
            step={5000}
            value={calc.dailyVolume}
            setValue={value => handleOnChange('dailyVolume', value)}
            currencyFormat={true}
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
          {/* <FormRangeInput
            label="% of claim period"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calc.precentClaimPeriod}
            setValue={value => handleOnChange('precentClaimPeriod', value)}
          /> */}
          <FormRangeInput
            label="Reflection tax"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calc.precentReflection}
            setValue={value => handleOnChange('precentReflection', value)}
          />
          <FormRangeInput
            label="Treasury tax"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calc.precentTreasury}
            setValue={value => handleOnChange('precentTreasury', value)}
          />
        </Col>
        <Col lg={4}>
          <FormRangeInput
            label="$FROCK price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calc.frocPrice}
            setValue={value => handleOnChange('frocPrice', value)}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Ownership share"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calc.precentYourPortfolio}
            setValue={value => handleOnChange('precentYourPortfolio', value)}
          />
          <FormRangeInput
            label="Your entry price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calc.yourEntryPrice}
            setValue={value => handleOnChange('yourEntryPrice', value)}
            currencyFormat={true}
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
            currencyFormat={true}
          />
          <FormRangeInput
            label="Strong returns"
            tooltip={{
              text: 'For simplicity in the calculator, this number should take the incurred gas fees into account. The 0.085 value starting value is taking 0.06 (7%) for gas fees from the current 0.091 daily returns.',
            }}
            type="number"
            minValue={0.01}
            maxValue={0.09}
            step={0.005}
            value={calc.strongReturn}
            setValue={value => handleOnChange('strongReturn', value)}
          />
          <FormRangeInput
            label="Nodes launch"
            tooltip={{
              text: 'The number of nodes in treasury at the start of the calculator period. The full amount raised during public sale will buy 2 $STRONG nodes.',
            }}
            type="number"
            minValue={1}
            maxValue={10}
            value={calc.nodesCount}
            setValue={value => handleOnChange('nodesCount', value)}
          />
          <FormRangeInput
              label="Compound"
              type="number"
              symbol={{ label: '%', position: 'end' }}
              minValue={0}
              maxValue={100}
              value={calc.precentCompound}
              setValue={value => handleOnChange('precentCompound', value)}
          />
          <FormRangeInput
              label="Return"
              type="number"
              symbol={{ label: '%', position: 'end' }}
              minValue={0}
              maxValue={100}
              value={calc.precentReturn}
              setValue={value => handleOnChange('precentReturn', value)}
          />
        </Col>
      </Row>
    </Card>
  )
}
