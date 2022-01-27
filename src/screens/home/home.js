import { Col, Container, Row } from 'react-bootstrap'
import Calculator from './sections/calculator/calculator'
import CardBalance from './sections/card-balance/card-balance'
import CardFrockPrice from './sections/card-frock-price/card-frock-price'
import CardInfo from './sections/card-info/card-info'
import FaqSection from './sections/faq-section/faq-section'
import './home.scss'
import { useState } from 'react'

export default function Home() {
  const [frockYourReturn, setFrockYourReturn] = useState(0)

  return (
    <Container className="home overflow-hidden">
      <Row>
        <Col className="px-mobile-0 mb-4">
          <Calculator />
        </Col>
      </Row>
      <Row>
        <Col lg={4} className="px-mobile-0">
          <CardBalance frockYourReturn={frockYourReturn} />
        </Col>
        <Col lg={5} className="px-mobile-0">
          <CardFrockPrice />
        </Col>
        <Col lg={3} className="px-mobile-0">
          <CardInfo
            handleSetFrockYourReturn={value => setFrockYourReturn(value)}
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
