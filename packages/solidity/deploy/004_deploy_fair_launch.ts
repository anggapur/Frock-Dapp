import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import { DeployFunction } from 'hardhat-deploy/types'; 

import { USDC, FairPriceLaunchNRT, FairPriceLaunch__factory } from '@project/contracts/typechain/generated';

const func: DeployFunction = async function ({    
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {

  type DeployArgs = Parameters<FairPriceLaunch__factory['deploy']>;
      
  // Initiate Named Accounts
  const {
      deployer: deployerAddress,
      treasury: treasuryAddress
  } = await getNamedAccounts();
  // Contract Name
  const CONTRACT_NAME = 'FairPriceLaunch';

  // Deploy logic
  let receiverContract = network.live && (await deployments.getOrNull(CONTRACT_NAME));
  if (!receiverContract) {        
      console.debug(`Deploying FairLaunch Contract`);

      // Get USDC Token
      const usdcFtm = await deployments.get('USDC')
      const usdc = (await ethers.getContract<USDC>(`USDC`)).attach(
        usdcFtm.address
      ) as USDC;
      const usdcDecimals = await usdc.decimals();   
      // Get Community Offering NRT
      const fairPriceLaunchNRT = await ethers.getContract<FairPriceLaunchNRT>(
        'FairPriceLaunchNRT',
        deployerAddress
      );
            
      // Params
      const launchStartTime = 1645286400 // 19 feb 2022 04:00 PM UTC 
      const saleDuration = (2 * 86400) // 2 days
      const investRemovalDelay = 1 * 3600
      const maxInvestAllowed = ethers.utils.parseUnits("2500", usdcDecimals) // 2_500 USDC
      const maxInvestRemovablePerPeriod = ethers.utils.parseUnits("1000", usdcDecimals)
      const maxGlobalInvestAllowed = ethers.utils.parseUnits("87500", usdcDecimals)
      const frockDecimals = 9;
      const maxRedeemableToIssue = ethers.utils.parseUnits('350000', frockDecimals); // 350_000 FROCK
      const statingPrice = ethers.utils.parseUnits("0.08", usdcDecimals) // 0,08 USDC            

      const args: DeployArgs = [                    
        treasuryAddress, // fundsRedeemer,
        usdc.address, // Invest Token
        launchStartTime, // launchStartTime
        saleDuration, // saleDuration
        investRemovalDelay, //investRemovalDelay
        maxInvestAllowed, // maxInvestAllowed
        0, // minInvestAllowed
        maxInvestRemovablePerPeriod, // maxInvestRemovablePerPeriod
        maxGlobalInvestAllowed, // maxGlobalInvestAllowed
        maxRedeemableToIssue, //maxRedeemableToIssue
        statingPrice, // startingPrice
        fairPriceLaunchNRT.address // redeemableToken
      ];
  
      receiverContract = await deployments.deploy(CONTRACT_NAME, {
      contract: CONTRACT_NAME,
      from: deployerAddress, // Deployer will be performing the deployment transaction.
      args, // Arguments to the contract's constructor.
      log: true, // Display the address and gas used in the console (not when run in test though).
      });
  }    

};

func.tags = ['FairLaunch']; // This sets up a tag so you can execute the script on its own (and its dependencies).
func.dependencies = ['FairLaunchNRT']

export default func;