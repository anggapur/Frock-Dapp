import { ethers } from 'ethers';
  import { HardhatRuntimeEnvironment } from 'hardhat/types'; // This adds the type from hardhat runtime environment.
  import { DeployFunction } from 'hardhat-deploy/types'; 

  import { USDC, CommunityOfferingNRT, CommunityOffering__factory } from '@project/contracts/typechain/generated';

  const func: DeployFunction = async function ({    
    ethers,
    network,
    deployments,
    getNamedAccounts,
  }: HardhatRuntimeEnvironment) {

    type DeployArgs = Parameters<CommunityOffering__factory['deploy']>;
        
    // Initiate Named Accounts
    const {
        deployer: deployerAddress,
        treasury : treasuryAddress
    } = await getNamedAccounts();
    // Contract Name
    const CONTRACT_NAME = 'CommunityOffering';
    
    // Deploy logic
    let receiverContract = network.live && (await deployments.getOrNull(CONTRACT_NAME));
    if (!receiverContract) {        
        console.debug(`Deploying CommunityOffering Contract`);

        // Get USDC Token
        const usdcFtm = await deployments.get('USDC')
        const usdc = (await ethers.getContract<USDC>(`USDC`)).attach(
          usdcFtm.address
        ) as USDC;
        const usdcDecimals = await usdc.decimals();          
        // Get Community Offering NRT
        const communityOfferingNRT = await ethers.getContract<CommunityOfferingNRT>(
          'CommunityOfferingNRT',
          deployerAddress
        );      

        // Params
        const startTime = 1644681600 // 12 Feb 2022 4:00 PM UTC , check on https://www.epochconverter.com/
        const duration = (2 * 86400) // 2 days
        const epochTime = (6 * 3600) // every 6 hours
        const initialCap = ethers.utils.parseUnits("100", usdcDecimals) // 100 USDC

        // 125_000 Frock Token, each token worth 0,08 USDC = 10_000 USDC
        const amountFrockToSale = ethers.BigNumber.from('125000')
        const frockPrice = ethers.utils.parseUnits("0.08", usdcDecimals) // 0,08 USDC
        const totalRaiseCap  = amountFrockToSale.mul(frockPrice) // 10_000 USDC

        console.log("Total Raise Cap : ", totalRaiseCap.toString())

        const args: DeployArgs = [                    
          usdc.address, // Invest Token
          startTime, // Stat Time
          duration, /// Duration
          epochTime, // Epoch Time
          initialCap, // Initial Cap
          totalRaiseCap, // totalraiseCap
          0, // Min Invest, There is no minimum invest
          treasuryAddress, // Treasury,
          communityOfferingNRT.address , 
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
func.dependencies = ['CommunityNRT'];

export default func;