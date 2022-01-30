  import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
  import { DeployFunction } from 'hardhat-deploy/types'; 

  import { CommunityOffering__factory } from '../../contracts/typechain/generated';

  const func: DeployFunction = async function ({    
    network,
    deployments,
    getNamedAccounts,
  }: HardhatRuntimeEnvironment) {

    type DeployArgs = Parameters<CommunityOffering__factory['deploy']>;
        
    // Initiate Named Accounts
    const {
        deployer: deployerAddress
    } = await getNamedAccounts();
    // Contract Name
    const CONTRACT_NAME = 'CommunityOffering';
    
    

    // Deploy logic
    let receiverContract = network.live && (await deployments.getOrNull(CONTRACT_NAME));
    if (!receiverContract) {        
        console.debug(`Deploying CommunityOffering Contract`);

        const args: DeployArgs = [                    
          "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", // Invest Token
          0, // Stat Time
          60000, /// Duration
          1000, // Epoch Time,
          0, // Initial Cap
          1000, // totalraiseCap
          100, // Min Invest,
          "0x4a15DEd9E9d872A1dC191739859D783FB87650c1" // Treasury
        ];
    
        receiverContract = await deployments.deploy(CONTRACT_NAME, {
        contract: CONTRACT_NAME,
        from: deployerAddress, // Deployer will be performing the deployment transaction.
        args, // Arguments to the contract's constructor.
        log: true, // Display the address and gas used in the console (not when run in test though).
        });
    }    

};

func.tags = ['CommunityOffering']; // This sets up a tag so you can execute the script on its own (and its dependencies).

export default func;