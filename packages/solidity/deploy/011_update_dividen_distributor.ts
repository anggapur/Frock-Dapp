import {         
    DividenDistributorV2
} from '@project/contracts/typechain/generated';
import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
import { DeployFunction, DeployResult } from 'hardhat-deploy/types'; 

const func: DeployFunction = async function ({
  ethers,
  network,
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) {
  console.log("Update Dividen Distributor")

  // Initialize Type
  type OmitLast<T extends unknown[]> = T extends [...infer Head, unknown?]
  ? Head
  : never;            
  // Initiate Named Accounts
  const {        
      deployer: deployerAddress,              
  } = await getNamedAccounts();
  const deployer = await ethers.getNamedSigner('deployer');

  const LOGIC_NAME = 'DividenDistributorV2';
  const NAME = 'DividenDistributorProxy';
  const dividenDistributorProxy = (await deployments.get(NAME));

  if(!true)
    return;

  // Deploy logic
  let logicDeployed = network.live && (await deployments.getOrNull(LOGIC_NAME));
  if (!logicDeployed) {        
      console.debug(`Deploying Logic Contract ${LOGIC_NAME}`);
  
      logicDeployed = await deployments.deploy(LOGIC_NAME, {
      contract: LOGIC_NAME,
      from: deployerAddress, // Deployer will be performing the deployment transaction.
      args: [], // Arguments to the contract's constructor.
      log: true, // Display the address and gas used in the console (not when run in test though).
      });
  }
  const contractImpl = await ethers.getContract<DividenDistributorV2>(LOGIC_NAME);

  // Upgrade
  console.log(`Calling Upgrade To Function`)
  await contractImpl
  .attach(dividenDistributorProxy.address)
  .connect(deployer)
  .upgradeTo(contractImpl.address);


};

func.tags = ['UpdateDividenDistributor']; // This sets up a tag so you can execute the script on its own (and its dependencies).
// func.dependencies = ['DividenDistributor']

export default func;