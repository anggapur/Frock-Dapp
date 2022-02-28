import { Contract } from 'ethers';
import {     
    TreasuryV1,          
    FrockProxy,
    FrockTokenV1
  } from '@project/contracts/typechain/generated';
  import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
  import { DeployFunction, DeployResult } from 'hardhat-deploy/types'; 

  const func: DeployFunction = async function ({
    ethers,
    network,
    deployments,
    getNamedAccounts,
  }: HardhatRuntimeEnvironment) {

    // Initialize Type
    type OmitLast<T extends unknown[]> = T extends [...infer Head, unknown?]
    ? Head
    : never;            
    // Initiate Named Accounts
    const {
        treasury,
        deployer: deployerAddress,              
    } = await getNamedAccounts();
    // Contract Name
    const LOGIC_NAME = 'TreasuryV1';    

    // Get Frock Token
    const frockProxy = (await ethers.getContract<FrockProxy>('FrockProxy'))
    const frock = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address)    

    const minimumTokenToSwap = ethers.utils.parseUnits("100", 9);
    const fixedLimitTokenToSwap = ethers.utils.parseUnits("500", 9);
    const percentageToSwap = 2500;
    const mainToken = frock.address
    const treasuryDestination = treasury

    // Deploy logic
    let logicDeployed = network.live && (await deployments.getOrNull(LOGIC_NAME));
    if (!logicDeployed) {        
        console.debug(`Deploying Treasury Contract`);
    
        logicDeployed = await deployments.deploy(LOGIC_NAME, {
        contract: LOGIC_NAME,
        from: deployerAddress, // Deployer will be performing the deployment transaction.
        args: [
          minimumTokenToSwap,
          fixedLimitTokenToSwap,
          percentageToSwap,
          mainToken,
          treasuryDestination
        ], // Arguments to the contract's constructor.
        log: true, // Display the address and gas used in the console (not when run in test though).
        });
    }
    const contractImpl = await ethers.getContract<TreasuryV1>(LOGIC_NAME);


};

func.tags = ['Treasury']; // This sets up a tag so you can execute the script on its own (and its dependencies).
func.dependencies = ['Frock']

export default func;