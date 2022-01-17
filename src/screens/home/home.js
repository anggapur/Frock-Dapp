import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/layout/layout'
import CardBalance from './sections/card-balance/card-balance'
import CardFrockPrice from './sections/card-frock-price/card-frock-price'
import CardInfo from './sections/card-info/card-info'
import './home.scss'

export default function Home() {
  return (
    <Layout>
      <Container className="home">
        <Row>
          <Col lg={4} className="px-mobile-0">
            <CardBalance />
          </Col>
          <Col lg={5} className="px-mobile-0">
            <CardFrockPrice />
          </Col>
          <Col lg={3} className="px-mobile-0">
            <CardInfo />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
