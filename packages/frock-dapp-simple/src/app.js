/* eslint-disable jsx-a11y/anchor-is-valid */
import dividenProxy from "./abi/DividenDistributorProxy.json";
import dividenV1 from "./abi/DividenDistributorV1.json";
import "./app.css";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { Form, Container, Button, Card } from "react-bootstrap";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [rewardIds, setRewardIds] = useState("");
  const [rewardId, setRewardId] = useState("");

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const _address = await signer.getAddress();

      setIsConnected(_address !== null);
    })();
  }, []);

  const handleConnectToWeb3 = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const _address = await signer.getAddress();

    setIsConnected(_address !== null);
  };

  const handleBatchClaimReward = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const dividenDistributor = new ethers.Contract(
      dividenProxy.address,
      dividenV1.abi,
      signer
    );

    try {
      let _rewardIds = rewardIds
        .split(",")
        .map((_rewardId) => BigNumber.from(_rewardId));
      const resultClaim = await dividenDistributor.batchClaimReward(_rewardIds);
      resultClaim.wait();
      alert("Batch claim reward was successful, pending transaction processing.");
    } catch (err) {
      alert(`Batch claim reward failed!\nError: `+err['data']['message']+`\n ${err.message}`);
      console.error(err);
    } finally {
      setRewardIds("");
    }
  };

  const handleClaimReward = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const dividenDistributor = new ethers.Contract(
      dividenProxy.address,
      dividenV1.abi,
      signer
    );

    try {
      const _rewardId = BigNumber.from(rewardId);
      const resultClaim = await dividenDistributor.claimReward(_rewardId);
      resultClaim.wait();
      alert("Claim single reward was successful, pending transaction processing.");
    } catch (err) {
      alert(`Claim single reward failed!\nError: `+err['data']['message']+`\n ${err.message}`);
      console.error(err);
    } finally {
      setRewardId("");
    }
  };

  return (
    <Container className="mt-4">
      <p>
        <a
          href="#"
          className="connector__button"
          onClick={() => handleConnectToWeb3()}
        >
          <i
            className={`connector__logo ${
              isConnected && "connector__logo--active"
            }`}
          ></i>{" "}
          {isConnected ? "Connected to Web3" : "Connect to Web3"}
        </a>
      </p>
      <Card>
        <Card.Header>1. batchClaimReward</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="rewardIds">Claim multiple reward IDs</Form.Label>
            <Form.Control
              type="text"
              id="rewardIds"
              aria-describedby="rewardIds"
              placeholder=""
              onChange={(e) => setRewardIds(e.target.value)}
              value={rewardIds}
            />
            <Form.Text className="text-muted">
              Separate values using a comma (<code>,</code>) example:{" "}
              <code>1,2,3</code>
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => handleBatchClaimReward()}
            disabled={rewardIds === ""}
          >
            Write
          </Button>
        </Card.Body>
      </Card>
      <br />
      <Card>
        <Card.Header>2. claimReward</Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="rewardIds">Claim a single reward ID</Form.Label>
            <Form.Control
              type="text"
              id="rewardId"
              aria-describedby="rewardId"
              placeholder=""
              onChange={(e) => setRewardId(e.target.value)}
              value={rewardId}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => handleClaimReward()}
            disabled={rewardId === ""}
          >
            Write
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
