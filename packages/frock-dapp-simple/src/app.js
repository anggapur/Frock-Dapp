/* eslint-disable jsx-a11y/anchor-is-valid */
import "./app.css";
import { Form } from "react-bootstrap";
import { Container, Button, Card } from "react-bootstrap";

function App() {
  return (
    <Container className="mt-4">
      <p>
        <a href="#" className="connector__button">
          <i className="connector__logo"></i> Connect to Web3
        </a>
      </p>
      <Card>
        <Card.Header>1. batchClaimReward</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formRewardIds">
            <Form.Label htmlFor="rewardIds">rewardIds (uint256[])</Form.Label>
            <Form.Control
              type="text"
              id="rewardIds"
              aria-describedby="rewardIds"
              placeholder="rewardIds (uint256[])"
            />
          </Form.Group>
          <Button variant="primary" disabled>
            Write
          </Button>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Header>1. claimReward</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="formRewardId">
            <Form.Label htmlFor="rewardIds">rewardId (uint256)</Form.Label>
            <Form.Control
              type="text"
              id="rewardId"
              aria-describedby="rewardId"
              placeholder="rewardId (uint256)"
            />
          </Form.Group>
          <Button variant="primary" disabled>
            Write
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
