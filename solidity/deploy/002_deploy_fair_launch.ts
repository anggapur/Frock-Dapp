import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import { DeployFunction } from 'hardhat-deploy/types'; 

import { FairPriceLaunch__factory } from '../../contracts/typechain/generated';

const func: DeployFunction = async function ({    
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {

  type DeployArgs = Parameters<FairPriceLaunch__factory['deploy']>;
      
  // Initiate Named Accounts
  const {
      deployer: deployerAddress
  } = await getNamedAccounts();
  // Contract Name
  const CONTRACT_NAME = 'FairPriceLaunch';
  
  

  // Deploy logic
  let receiverContract = network.live && (await deployments.getOrNull(CONTRACT_NAME));
  if (!receiverContract) {        
      console.debug(`Deploying FairLaunch Contract`);

      const args: DeployArgs = [                    
        "0x4a15DEd9E9d872A1dC191739859D783FB87650c1", // fundsRedeemer,
        "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // Invest Token
        1648637672, // launchStartTime,
        "60000", // saleDuration,
        100, //investRemovalDelay,
        100000, // maxInvestAllowed,
        100, // minInvestAllowed,
        1000, // maxInvestRemovablePerPeriod,
        100000000, // maxGlobalInvestAllowed,
        1000000000, //maxRedeemableToIssue,
        8000000000, // startingPrice,
        "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664" // redeemableToken
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

export default func;