import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import { DeployFunction } from 'hardhat-deploy/types'; 

import { Frock__factory } from '@project/contracts/typechain/generated';

const func: DeployFunction = async function ({    
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {

  type DeployArgs = Parameters<Frock__factory['deploy']>;
      
  // Initiate Named Accounts
  const {
      deployer: deployerAddress,
      treasury: treasuryAddress
  } = await getNamedAccounts();
  // Contract Name
  const CONTRACT_NAME = 'Frock';

  // Deploy logic
  let receiverContract = network.live && (await deployments.getOrNull(CONTRACT_NAME));
  if (!receiverContract) {        
      console.debug(`Deploying Frock Contract`);
             
      // Params              
      const args: DeployArgs = [                    
        "Fractional Rocket",
        "Frock"
      ];
  
      receiverContract = await deployments.deploy(CONTRACT_NAME, {
        contract: CONTRACT_NAME,
        from: deployerAddress, // Deployer will be performing the deployment transaction.
        args, // Arguments to the contract's constructor.
        log: true, // Display the address and gas used in the console (not when run in test though).
      });
  }    

};

func.tags = ['Frock']; // This sets up a tag so you can execute the script on its own (and its dependencies).

export default func;