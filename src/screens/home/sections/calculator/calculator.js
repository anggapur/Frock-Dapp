import { useState, useEffect, useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import FormRangeInput from './form-range-input'
import { useCalculatorStore } from '../../../../store'
import { GetFantomPrice, GetStrongPrice } from '../../../../api'

export default function Calculator() {
  const [strongPrice, setStrongPrice] = useState(0)
  const [fantomPrice, setFantomPrice] = useState(0)

  const calculatorStore = useCalculatorStore()

  const fetchStrongPriceInUsd = useCallback(() => {
    Promise.all([GetStrongPrice(), GetFantomPrice()]).then(
      ([strongInUsd, fantomInUsd]) => {
        setStrongPrice(strongInUsd)
        setFantomPrice(fantomInUsd)
        calculatorStore.setStrongPrice(strongInUsd)
        calculatorStore.setFtmPrice(fantomInUsd)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchStrongPriceInUsd()
  }, [fetchStrongPriceInUsd])

  const handleResetClicked = () => {
    calculatorStore.setFtmPrice(fantomPrice)
    calculatorStore.setDailyVolume(50000)
    calculatorStore.setPrecentClaimPeriod(100)
    calculatorStore.setPrecentReflection(7)
    calculatorStore.setPrecentTreasury(14)
    calculatorStore.setFrocPrice(0.1)
    calculatorStore.setYourEntryPrice(0.094)
    calculatorStore.setPrecentYourPortfolio(1)
    calculatorStore.setPrecentCompound(67)
    calculatorStore.setPrecentReturn(33)
    calculatorStore.setPrecentMarketingWallet(10)
    calculatorStore.setDays(150)
    calculatorStore.setStrongPrice(strongPrice)
    calculatorStore.setStrongReturn(0.09)
    calculatorStore.setNodesCount(20)
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
      <Card.Header>Calculator</Card.Header>
      <Row>
        <Col lg={4}>
          <FormRangeInput
            label="FTM price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={20}
            value={calculatorStore.ftmPrice}
            setValue={calculatorStore.setFtmPrice}
            currencyFormat={true}
            hideBar={true}
          />
          <FormRangeInput
            label="Daily Volume"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={100000}
            step={5000}
            value={calculatorStore.dailyVolume}
            setValue={calculatorStore.setDailyVolume}
            currencyFormat={true}
          />
          {/* <FormRangeInput
            label="% of claim period"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentClaimPeriod}
            setValue={calculatorStore.setPrecentClaimPeriod}
          /> */}
          <FormRangeInput
            label="Reflection %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calculatorStore.precentReflection}
            setValue={calculatorStore.setPrecentReflection}
          />
          <FormRangeInput
            label="Treasury %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={21}
            value={calculatorStore.precentTreasury}
            setValue={calculatorStore.setPrecentTreasury}
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
            value={calculatorStore.frocPrice}
            setValue={calculatorStore.setFrocPrice}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Your portfolio"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            step={2}
            value={calculatorStore.precentYourPortfolio}
            setValue={calculatorStore.setPrecentYourPortfolio}
          />
          <FormRangeInput
            label="Your entry price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={2.5}
            step={0.01}
            value={calculatorStore.yourEntryPrice}
            setValue={calculatorStore.setYourEntryPrice}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Compound"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentCompound}
            setValue={calculatorStore.setPrecentCompound}
          />
          <FormRangeInput
            label="Return"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentReturn}
            setValue={calculatorStore.setPrecentReturn}
          />
        </Col>
        <Col lg={4}>
          {/* <FormRangeInput
            label="Marketing/dev wallet"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentMarketingWallet}
            setValue={calculatorStore.setPrecentMarketingWallet}
          /> */}
          <FormRangeInput
            label="Days"
            type="number"
            minValue={1}
            maxValue={365}
            value={calculatorStore.days}
            setValue={calculatorStore.setDays}
          />
          <FormRangeInput
            label="Strong price"
            type="text"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={1000}
            value={calculatorStore.strongPrice}
            setValue={calculatorStore.setStrongPrice}
            currencyFormat={true}
          />
          <FormRangeInput
            label="Strong returns"
            type="number"
            minValue={0.01}
            maxValue={0.09}
            step={0.005}
            value={calculatorStore.strongReturn}
            setValue={calculatorStore.setStrongReturn}
          />
          <FormRangeInput
            label="Nodes bought starting point"
            tooltip={{
              anchorText: 'Read more',
              anchorLink: '/',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            }}
            type="number"
            minValue={1}
            maxValue={100}
            value={calculatorStore.nodesCount}
            setValue={calculatorStore.setNodesCount}
          />
        </Col>
      </Row>
    </Card>
  )
}
