import {
  COMMUNITY_OFFERING_NRT_ADDR,
  FAIR_PRICE_NRT_ADDR,
  FROCK_ADDR,
} from '@project/contracts/src/address';

export const DAYS_IN_YEAR = 365;
export const FROCK_SUPPLY = 1000000;
export const GROWTH_IN_PRICE = 20;
export const GAS_FEE_FOR_CLAIM = 15;
export const GAS_FEE_FOR_CREATE = 100;
export const LINK_VOLUME_PER_PRICE = 0;
export const FANTOM_CHAIN_PARAMS = {
  chainId: '0xfa',
  chainName: 'Fantom Opera',
  rpcUrls: ['https://rpc.ftm.tools'],
};
export const USDC_DECIMALS = 6;
export const FROCK_DECIMALS = 9;
export const AFROCK_TOKEN_DATA = {
  address: COMMUNITY_OFFERING_NRT_ADDR,
  symbol: 'aFROCK',
  decimals: 9,
  image: 'https://fractionalrocket.money/afrock-logo.png',
};
export const BFROCK_TOKEN_DATA = {
  address: FAIR_PRICE_NRT_ADDR,
  symbol: 'bFROCK',
  decimals: 9,
  image: 'https://fractionalrocket.money/bfrock-logo.png',
};
export const FROCK_TOKEN_DATA = {
  address: FROCK_ADDR,
  symbol: 'FROCK',
  decimals: 9,
  image: 'https://fractionalrocket.money/frock-logo.png',
};
export const LAST_TREASURY_DIVIDEND_DISTRIBUTION = 1644883200000;
