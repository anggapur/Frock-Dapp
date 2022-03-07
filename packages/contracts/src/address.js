import USDC from "../deployments/fantom/USDC.json";
import CommunityOffering from "../deployments/fantom/CommunityOffering.json";
import CommunityOfferingNRT from "../deployments/fantom/CommunityOfferingNRT.json";
import DividenProxy from "../deployments/fantom/DividenDistributorProxy.json";
import DividenDistributor from "../deployments/fantom/DividenDistributorV2.json";
import FairPriceLaunchNRT from "../deployments/fantom/FairLaunchNRT.json";
import FairPriceLaunch from "../deployments/fantom/FairPriceLaunch.json";
import FrockProxy from "../deployments/fantom/FrockProxy.json";
import FrockTokenV1 from "../deployments/fantom/FrockTokenV1.json";
import SpookyRouter from "../deployments/fantom/SpookyRouter.json";
import WFTM from "../deployments/fantom/WFTM.json";

export const COMMUNITY_OFFERING_ADDR = CommunityOffering.address;
export const COMMUNITY_OFFERING_NRT_ADDR = CommunityOfferingNRT.address;
export const FAIR_PRICE_ADDR = FairPriceLaunch.address;
export const FAIR_PRICE_NRT_ADDR = FairPriceLaunchNRT.address;
export const USDC_ADDR = USDC.address;
export const FROCK_ADDR = FrockProxy.address;
export const DIVIDEN_ADDR = DividenProxy.address;
export const SPOOKY_ADDR = SpookyRouter.address;
export const WFTM_ADDR = WFTM.address;

export const CommunityOfferingABI = CommunityOffering.abi;
export const CommunityOfferingNRTABI = CommunityOfferingNRT.abi;
export const FairPriceLaunchABI = FairPriceLaunch.abi;
export const FairPriceLaunchNRTABI = FairPriceLaunchNRT.abi;
export const USDCoinABI = USDC.abi;
export const FrockABI = FrockTokenV1.abi;
export const DividenABI = DividenDistributor.abi;
export const SpookyABI = SpookyRouter.abi;
export const WFTMABI = WFTM.abi;
