import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Calculator from './sections/calculator/calculator'
import CardBalance from './sections/card-balance/card-balance'
import CardFrockPrice from './sections/card-frock-price/card-frock-price'
import CardInfo from './sections/card-info/card-info'
import FaqSection from './sections/faq-section/faq-section'
import { GetFantomPrice, GetStrongPrice } from '../../api'
import './home.scss'
import {
  DAYS_IN_YEAR,
  GROWTH_IN_PRICE,
  LINK_VOLUME_PER_PRICE,
} from '../../constant'

export default function Home() {
  const [calculator, setCalculator] = useState({
    ftmPrice: 2,
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
    strongPrice: 500,
    strongReturn: 0.085,
    nodesCount: 2,
  })
  const [ftmPriceFromApi, setFtmPriceFromApi] = useState(0)
  const [strongPriceFromApi, setStrongPriceFromApi] = useState(0)

  useEffect(() => {
    Promise.all([GetStrongPrice(), GetFantomPrice()]).then(
      ([strongInUsd, fantomInUsd]) => {
        setCalculator({
          ...calculator,
          strongPrice: strongInUsd,
          ftmPrice: fantomInUsd,
        })

        setFtmPriceFromApi(fantomInUsd)
        setStrongPriceFromApi(strongInUsd)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [volumeUsed, setVolumeUsed] = useState(0)
  useEffect(() => {
    const linkedDailyVolume =
      calculator.dailyVolume * (1 + GROWTH_IN_PRICE / 10)
    const _volumeUsed =
      LINK_VOLUME_PER_PRICE === 1 ? linkedDailyVolume : calculator.dailyVolume
    setVolumeUsed(_volumeUsed)
  }, [calculator.dailyVolume])

  const [yearReturn, setYearReturn] = useState(0)
  useEffect(() => {
    const _precentYourPortfolio = calculator.precentYourPortfolio / 100
    const _precentReflection = calculator.precentReflection / 100
    setYearReturn(
      volumeUsed * DAYS_IN_YEAR * _precentYourPortfolio * _precentReflection
    )
  }, [
    volumeUsed,
    calculator.precentYourPortfolio,
    calculator.precentReflection,
  ])

  const [returnFromTreasury, setReturnFromTreasury] = useState(0)
  const [cumulativeStrongTotalInYear, setCumulativeStrongTotalInYear] =
    useState(0)
  useEffect(() => {
    const _precentYourPortfolio = calculator.precentYourPortfolio / 100
    const _precentReturn = calculator.precentReturn / 100
    setReturnFromTreasury(
      cumulativeStrongTotalInYear *
        calculator.strongPrice *
        _precentYourPortfolio *
        _precentReturn
    )
  }, [
    cumulativeStrongTotalInYear,
    calculator.strongPrice,
    calculator.precentYourPortfolio,
    calculator.precentReturn,
  ])

  return (
    <Container className="home overflow-hidden">
      <Row>
        <Col className="px-mobile-0 mb-4">
          <Calculator
            calc={calculator}
            setCalc={setCalculator}
            ftmPriceFromApi={ftmPriceFromApi}
            strongPriceFromApi={strongPriceFromApi}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="px-mobile-0">
          <CardBalance
            calc={calculator}
            volumeUsed={volumeUsed}
            yearReturn={yearReturn}
            returnFromTreasury={returnFromTreasury}
          />
        </Col>
        <Col lg={5} className="px-mobile-0">
          <CardFrockPrice calc={calculator} volumeUsed={volumeUsed} />
        </Col>
        <Col lg={3} className="px-mobile-0">
          <CardInfo
            calc={calculator}
            setCumulativeStrongTotalInYear={value =>
              setCumulativeStrongTotalInYear(value)
            }
            yearReturn={yearReturn}
            returnFromTreasury={returnFromTreasury}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="px-mobile-0">
          <FaqSection />
        </Col>
      </Row>
    </Container>
  )
}
