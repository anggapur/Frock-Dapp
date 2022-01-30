import { Col, Container, Row } from "react-bootstrap"
import Card from "../../../components/card/card"
import Countdown from "../../../components/countdown/countdown"
import "./../sale.scss"

export default function PublicSale() {
  return (
    <Container className="sale">
      <Row className="sale__header">
        <Col lg={6}>
          <h1>Fractional Rocket Public Sale</h1>
        </Col>
        <Col lg={6}>
          <Countdown className="float-lg-end" />
        </Col>
      </Row>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Vulputate mi mattis vitae lobortis pharetra tincidunt 
        vivamus dignissim rhoncus. Mi, rhoncus est sapien sed enim. 
        Proin rhoncus augue id viverra nulla ac porttitor. 
        Donec purus amet nunc eget morbi. Vulputate mi mattis vitae 
        lobortis pharetra tincidunt vivamus dignissim rhoncus. 
        Mi, rhoncus est sapien sed enim
      </p>
      <Row>
        <Col lg={7}>
          <Card lineBottom="light">
            <div className="sale__card__coin-raised">
              <div className="sale__card__coin-raised__start-end">
                <div>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.27179 0C2.36143 0 0 2.375 0 5.30208C0 8.22917 2.36143 10.6094 5.27179 10.6094C8.18214 10.6094 10.5488 8.23438 10.5488 5.30729H5.27179V0Z" fill="white"/>
                  </svg>
                  <div>
                    <h4>Start Time:</h4>
                    <p>28 Dec. 17:00 UTC</p>
                  </div>
                </div>
                <div>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.27179 0C2.36143 0 0 2.375 0 5.30208C0 8.22917 2.36143 10.6094 5.27179 10.6094C8.18214 10.6094 10.5488 8.23438 10.5488 5.30729H5.27179V0Z" fill="white"/>
                  </svg>
                  <div>
                    <h4>End Time:</h4>
                    <p>30 Dec. 17:00 UTC</p>
                  </div>
                </div>
              </div>
              sa
            </div>
            Starting $Frock Price
          </Card>
        </Col>
        <Col lg={5}>
          <Card>sa</Card>
        </Col>
      </Row>
    </Container>
  )
}
