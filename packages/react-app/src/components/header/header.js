import React, { createRef, useEffect, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import lottie from 'lottie-web';
import shallow from 'zustand/shallow';

import logoWhiteJson from '../../assets/animations/logo-white.json';
import {
  AFROCK_TOKEN_DATA,
  BFROCK_TOKEN_DATA,
  FANTOM_CHAIN_PARAMS,
  FROCK_TOKEN_DATA,
} from '../../constants';
import { useWeb3Accounts } from '../../hooks/ethers/account';
import { useFirework } from '../../hooks/useFirework';
import { useStore } from '../../hooks/useStore';
import { useWeb3Modal } from '../../hooks/useWeb3Modal';
import { handleShortenAddress } from '../../utils';
import RoundButton from '../button/button';
import CompanyLogo from '../logo/company-logo';
import Modal from '../modal/modal';
import { ToastError } from '../toast/toast';
import './header.scss';

function NotificationBar({ text }) {
  return (
    <div className="notification-bar">
      <p>{text}</p>
    </div>
  );
}

export default function Header() {
  const [showModal, setShowModal] = useState(true);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const location = useLocation();

  const { setActive } = useFirework();

  const web3ModalConfig = {
    autoLoad: true,
    network: '',
  };
  const { _walletExist, provider, loadWeb3Modal, logoutWeb3Modal } =
    useWeb3Modal(web3ModalConfig);

  const accounts = useWeb3Accounts();

  const setProvider = useStore(state => state.setProvider, shallow);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference =
      Date.UTC(2022, 1, 19, 16) -
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      );

    if (difference <= 0) {
      return { isAfterTwoDays: difference <= -165600000 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (provider) {
      setProvider({ provider });
    }
  }, [provider, setProvider]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const logoButtonRef = createRef();
  const logoButtonModalRef = createRef();

  useEffect(() => {
    lottie.loadAnimation({
      name: 'logo-on-button',
      container: logoButtonRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: logoWhiteJson,
    });

    lottie.loadAnimation({
      name: 'logo-on-button',
      container: logoButtonModalRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: logoWhiteJson,
    });

    return () => lottie.destroy('logo-on-button');
  }, [accounts]);

  const handleAddOrChangeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: FANTOM_CHAIN_PARAMS.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [FANTOM_CHAIN_PARAMS],
          });
        } catch (addError) {
          throw new Error(addError);
        }
      }
    }
  };

  const handleConnectWallet = async () => {
    if (
      typeof window.ethereum === 'undefined' ||
      typeof window.web3 === 'undefined'
    ) {
      return ToastError(
        <>No wallet found in your browser, Please install Metamask!</>,
      );
    }

    if (provider === undefined) {
      try {
        lottie.play('logo-on-button');
        await loadWeb3Modal();
        await handleAddOrChangeNetwork();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        lottie.stop('logo-on-button');
      }
    }
  };

  const handleDisconnectWallet = async e => {
    e.preventDefault();
    await logoutWeb3Modal();
  };

  const handleAddToken = async tokenData => {
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenData.address,
          symbol: tokenData.symbol,
          decimals: tokenData.decimals,
          image: tokenData.image,
        },
      },
    });
  };

  return (
    <>
      <header>
        <NotificationBar
          text={
            Object.keys(timeLeft).length !== 1
              ? `Community Sale sold out! Countdown to Public Sale: ${
                  timeLeft.days > 1
                    ? `${timeLeft.days} days,`
                    : `${timeLeft.days !== 0 ? `${timeLeft.days} day,` : ''}`
                } ${
                  timeLeft.hours > 1
                    ? `${timeLeft.hours} hours,`
                    : `${timeLeft.hours !== 0 ? `${timeLeft.hours} hour,` : ''}`
                } ${
                  timeLeft.minutes > 1
                    ? `${timeLeft.minutes} minutes,`
                    : `${
                        timeLeft.minutes !== 0
                          ? `${timeLeft.minutes} minute,`
                          : ''
                      }`
                } ${
                  timeLeft.seconds > 1
                    ? `${timeLeft.seconds} seconds`
                    : `${timeLeft.seconds} second`
                }`
              : `The Public Sale ${
                  !timeLeft.isAfterTwoDays ? 'is Active Now!' : 'has finished.'
                }`
          }
        />
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand onClick={() => setActive(true)}>
              <CompanyLogo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Link to="/calculator" className="nav-link">
                  Calculator
                </Link>
                <Link to="/community-sale" className="nav-link">
                  Community Sale
                </Link>
                <Link to="/public-sale" className="nav-link">
                  Public Sale
                </Link>
                {/* <Link to="/dashboard" className="nav-link"> */}
                {/*  Dashboard */}
                {/* </Link> */}
                {!provider ? (
                  <RoundButton
                    onClick={handleConnectWallet}
                    variant="primary"
                    isRounded
                  >
                    <div
                      ref={logoButtonRef}
                      style={{
                        height: '32px',
                        display: 'inline-block',
                        margin: '-5px 5px -5px -5px',
                      }}
                    />
                    Connect
                  </RoundButton>
                ) : (
                  <NavDropdown
                    title={
                      <>
                        <div
                          ref={logoButtonRef}
                          style={{
                            height: '32px',
                            display: 'inline-block',
                            margin: '-5px 5px -5px -5px',
                          }}
                        />
                        {accounts && handleShortenAddress(accounts[0])}
                      </>
                    }
                    id="nav-dropdown"
                    align="end"
                    onMouseOver={() => setIsShowDropdown(true)}
                    onMouseOut={() => setIsShowDropdown(false)}
                    onClick={() => setIsShowDropdown(!isShowDropdown)}
                    show={isShowDropdown}
                  >
                    <NavDropdown.Item onClick={e => handleDisconnectWallet(e)}>
                      Disconnect
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleAddToken(AFROCK_TOKEN_DATA)}
                    >
                      Add $aFROCK to wallet
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => handleAddToken(BFROCK_TOKEN_DATA)}
                    >
                      Add $bFROCK to wallet
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item */}
                    {/*  onClick={() => handleAddToken(FROCK_TOKEN_DATA)} */}
                    {/* > */}
                    {/*  Add $FROCK to wallet */}
                    {/* </NavDropdown.Item> */}
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <Modal
        show={
          (location.pathname === '/community-sale' ||
            location.pathname === '/public-sale') &&
          showModal &&
          provider === undefined
        }
        onHide={() => setShowModal(false)}
      >
        <Modal.Header type="greeting" title="Welcome to Fractional Rocket!" />
        <Modal.Body>
          <p>Please connect your MetaMask wallet</p>
          <RoundButton
            isRounded
            onClick={handleConnectWallet}
            variant="primary"
          >
            <div
              ref={logoButtonModalRef}
              style={{
                height: '32px',
                display: 'inline-block',
                margin: '-5px 0px -5px -5px',
              }}
            />{' '}
            Connect Wallet
          </RoundButton>
        </Modal.Body>
      </Modal>
    </>
  );
}
