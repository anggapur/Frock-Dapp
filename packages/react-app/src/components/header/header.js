import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import shallow from 'zustand/shallow';

import { FANTOM_CHAIN_PARAMS } from '../../constants';
import { useWeb3Accounts } from '../../hooks/ethers/account';
import { useStore } from '../../hooks/useStore';
import { useWeb3Modal } from '../../hooks/useWeb3Modal';
import { handleShortenAddress } from '../../utils';
import RoundButton from '../button/button';
import CompanyLogo from '../logo/company-logo';
import { ToastError } from '../toast/toast';
import './header.scss';
import logoSmall from './logo-small.svg';

function NotificationBar({ text }) {
  return (
    <div className="notification-bar">
      <p>{text}</p>
    </div>
  );
}

export default function Header() {
  const web3ModalConfig = {
    autoLoad: true,
    network: '',
  };
  const { _walletExist, provider, loadWeb3Modal, logoutWeb3Modal } =
    useWeb3Modal(web3ModalConfig);

  const accounts = useWeb3Accounts();

  const setProvider = useStore(state => state.setProvider, shallow);

  useEffect(() => {
    if (provider) {
      setProvider({ provider });
    }
  }, [provider, setProvider]);

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
      await loadWeb3Modal();
      await handleAddOrChangeNetwork();
    }
  };

  const handleDisconnectWallet = async () => {
    await logoutWeb3Modal();
  };

  return (
    <header>
      <NotificationBar text="Some notice can go here to alert users on anything newsworthy" />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <CompanyLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Link to="/" className="nav-link">
                Calculator
              </Link>
              <Link to="/community-sale" className="nav-link">
                Community Sale
              </Link>
              <Link to="/public-sale" className="nav-link">
                Public Sale
              </Link>
              {/* <NavDropdown title="$FROCK" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Add $FROCK to wallet
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Buy $FROCK
                </NavDropdown.Item>
              </NavDropdown> */}
              <RoundButton
                onClick={
                  !provider ? handleConnectWallet : handleDisconnectWallet
                }
                variant="primary"
                isRounded
              >
                <img src={logoSmall} alt="logo fractional rocket white" />
                {provider && accounts
                  ? handleShortenAddress(accounts[0])
                  : 'Connect'}
              </RoundButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
