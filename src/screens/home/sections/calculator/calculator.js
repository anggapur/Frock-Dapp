import { useState, useEffect, useCallback } from 'react'
import { Col, Row } from 'react-bootstrap'
import { GetStrongPrice } from '../../../../api/get-strong-price'
import RoundButton from '../../../../components/button/button'
import Card from '../../../../components/card/card'
import FormRangeInput from './form-range-input'
import { useCalculatorStore } from '../../../../store'

export default function Calculator() {
  // const [ftmPrice, setFtmPrice] = useState(2)
  // const [dailyVolume, setDailyVolume] = useState(10000)
  // const [precentClaimPeriod, setPrecentClaimPeriod] = useState(100)
  // const [precentReflection, setPrecentReflection] = useState(7)
  // const [precentTreasury, setPrecentTreasury] = useState(14)
  // const [frocPrice, setFrocPrice] = useState(0.00394)
  // const [precentYourPortfolio, setPrecentYourPortfolio] = useState(1)
  // const [precentCompound, setPrecentCompound] = useState(67)
  // const [precentReturn, setPrecentReturn] = useState(33)
  // const [precentMarketingWallet, setPrecentMarketingWallet] = useState(10)
  // const [days, setDays] = useState(150)
  const [strongPrice, setStrongPrice] = useState(500)
  // const [precentStrongReturn, setPrecentStrongReturn] = useState(9)
  // const [nodesCount, setNodesCount] = useState(20)
  // const [strongFromFetch, setStrongFromFetch] = useState(0)

  const calculatorStore = useCalculatorStore()

  const fetchStrongPriceInUsd = useCallback(async () => {
    const strongInUsd = await GetStrongPrice()
    setStrongPrice(strongInUsd)
    calculatorStore.setStrongPrice(strongInUsd)
  }, [])

  useEffect(() => {
    fetchStrongPriceInUsd()
  }, [fetchStrongPriceInUsd])

  // useEffect(() => {
  //   // const getBalance = () => {
  //   //   const reflections =
  //   //     (precentClaimPeriod / 100) *
  //   //     (precentYourPortfolio / 100) *
  //   //     dailyVolume *
  //   //     (precentReflection / 100) *
  //   //     days
  //   //   const pending = reflections / ftmPrice
  //   //   const claimable = pending.valueOf()
  //   //   return {
  //   //     pending,
  //   //     claimable,
  //   //     reflections,
  //   //   }
  //   // }
  //   // handleSetBalance(getBalance())
  // }, [
  //   precentClaimPeriod,
  //   precentYourPortfolio,
  //   dailyVolume,
  //   precentReflection,
  //   days,
  //   ftmPrice,
  //   balance,
  // ])

  // const handleResetClicked = () => {
  //   setFtmPrice(2)
  //   setDailyVolume(10000)
  //   setPrecentClaimPeriod(100)
  //   setPrecentReflection(7)
  //   setPrecentTreasury(14)
  //   setFrocPrice(0.00394)
  //   setPrecentYourPortfolio(1)
  //   setPrecentCompound(67)
  //   setPrecentReturn(33)
  //   setPrecentMarketingWallet(10)
  //   setDays(150)
  //   setStrongPrice(strongFromFetch)
  //   setPrecentStrongReturn(9)
  //   setNodesCount(20)
  // }

  return (
    <Card ellipse="top-left">
      <RoundButton
        className="float-end"
        variant="light"
        size="small"
        isRounded
        // onClick={handleResetClicked}
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
