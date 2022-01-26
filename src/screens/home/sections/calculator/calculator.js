import { useState, useEffect, useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GetStrongPrice } from '../../../../api/get-strong-price'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import FormRangeInput from './form-range-input'
import { useCalculatorStore } from '../../../../store'

export default function Calculator() {
  const [strongPrice, setStrongPrice] = useState(500)

  const calculatorStore = useCalculatorStore()

  const fetchStrongPriceInUsd = useCallback(async () => {
    const strongInUsd = await GetStrongPrice()
    setStrongPrice(strongInUsd)
    calculatorStore.setStrongPrice(strongInUsd)
  }, [])

  useEffect(() => {
    fetchStrongPriceInUsd()
  }, [fetchStrongPriceInUsd])

  const handleResetClicked = () => {
    calculatorStore.setFtmPrice(2)
    calculatorStore.setDailyVolume(10000)
    calculatorStore.setPrecentClaimPeriod(100)
    calculatorStore.setPrecentReflection(7)
    calculatorStore.setPrecentTreasury(14)
    calculatorStore.setFrocPrice(0.00394)
    calculatorStore.setPrecentYourPortfolio(1)
    calculatorStore.setPrecentCompound(67)
    calculatorStore.setPrecentReturn(33)
    calculatorStore.setPrecentMarketingWallet(10)
    calculatorStore.setDays(150)
    calculatorStore.setStrongPrice(strongPrice)
    calculatorStore.setPrecentStrongReturn(9)
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
            type="number"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={100}
            value={calculatorStore.ftmPrice}
            setValue={calculatorStore.setFtmPrice}
          />
          <FormRangeInput
            label="Daily Volume"
            type="number"
            symbol={{ label: '$', position: 'start' }}
            minValue={100}
            maxValue={10000}
            value={calculatorStore.dailyVolume}
            setValue={calculatorStore.setDailyVolume}
          />
          <FormRangeInput
            label="% of claim period"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentClaimPeriod}
            setValue={calculatorStore.setPrecentClaimPeriod}
          />
          <FormRangeInput
            label="Reflection %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentReflection}
            setValue={calculatorStore.setPrecentReflection}
          />
          <FormRangeInput
            label="Treasury %"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentTreasury}
            setValue={calculatorStore.setPrecentTreasury}
          />
        </Col>
        <Col lg={4}>
          <FormRangeInput
            label="Froc price"
            type="number"
            symbol={{ label: '$', position: 'start' }}
            minValue={0}
            maxValue={10}
            step={0.0001}
            value={calculatorStore.frocPrice}
            setValue={calculatorStore.setFrocPrice}
          />
          <FormRangeInput
            label="Your portfolio"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentYourPortfolio}
            setValue={calculatorStore.setPrecentYourPortfolio}
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
          <FormRangeInput
            label="Marketing/dev wallet"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={0}
            maxValue={100}
            value={calculatorStore.precentMarketingWallet}
            setValue={calculatorStore.setPrecentMarketingWallet}
          />
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
            type="number"
            symbol={{ label: '$', position: 'start' }}
            minValue={1}
            maxValue={1000}
            value={calculatorStore.strongPrice}
            setValue={calculatorStore.setStrongPrice}
          />
          <FormRangeInput
            label="Strong returns"
            type="number"
            symbol={{ label: '%', position: 'end' }}
            minValue={1}
            maxValue={100}
            value={calculatorStore.precentStrongReturn}
            setValue={calculatorStore.setPrecentStrongReturn}
          />
          <FormRangeInput
            label="Nodes bought starting point"
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
