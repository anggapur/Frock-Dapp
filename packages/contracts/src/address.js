import USDC from "../deployments/fantom/USDC.json";
import CommunityOffering from "../deployments/localhost/CommunityOffering.json";
import FairPriceLaunch from "../deployments/localhost/FairPriceLaunch.json";
import Frock from "../deployments/localhost/Frock.json";

export const COMMUNITY_OFFERING_ADDR = CommunityOffering.address;
export const FAIR_PRICE_ADDR = FairPriceLaunch.address;
export const USDC_ADDR = USDC.address;
export const FROCK_ADDR = Frock.address;

export const CommunityOfferingABI = CommunityOffering.abi;
export const FairPriceLaunchABI = FairPriceLaunch.abi;
export const USDCoinABI = USDC.abi;
export const FrockABI = Frock.abi;
