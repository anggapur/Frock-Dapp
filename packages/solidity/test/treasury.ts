import { calculateDividen } from "./utils/calculations";
import { SignerWithAddress } from "./utils/interfaces";
import {  
  TreasuryV1,
  FrockTokenV1,
  FrockProxy,
  SpookyRouter,
  SpookyFactory
} from "@project/contracts/typechain/generated";
import { expect } from "chai";
import { deployments, ethers, upgrades, network } from "hardhat";


describe("Dividend Distributor 1", async () => {  
  let deployer: SignerWithAddress;  
  let treasuryDestination: SignerWithAddress
  let frockToken: FrockTokenV1
  let frockProxy: FrockProxy  
  let treasuryContract: TreasuryV1  
  let frockDecimals: number;
  let spookyRouter: SpookyRouter;
  let spookyFactory: SpookyFactory;

  before(async () => {
    await deployments.fixture(["Treasury"], {
      keepExistingDeployments: true,
    });

    // Get Frock Contract
    frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
    frockToken = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);
    frockDecimals = await frockToken.decimals();    
    // Get Spooky DEX
    spookyRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
    spookyFactory = await ethers.getContract<SpookyFactory>('SpookyFactory');
    // Treasury    
    treasuryContract = await ethers.getContract<TreasuryV1>('TreasuryV1');

    ({
      deployer,
      treasury: treasuryDestination
    } = await ethers.getNamedSigners());
  });

  describe("Treasury", async () => { 
    it('Create Liquidity Pool', async() => {
      const deadline = (await ethers.provider.getBlock("latest")).timestamp + 10;
      await frockToken.connect(deployer).approve(spookyRouter.address, ethers.utils.parseUnits("7000", frockDecimals))
      await spookyRouter.connect(deployer).addLiquidityETH(
        frockToken.address,
        ethers.utils.parseUnits("7000", frockDecimals), 
        0,
        0, 
        deployer.address, 
        deadline, {
          value : ethers.utils.parseUnits("7000")
        })

        const pairAddress = await spookyFactory.getPair(frockToken.address, (await spookyRouter.WETH()));
        console.log("Pair Address:")
        console.log(`Balance Frock of Pair : ${await frockToken.balanceOf(pairAddress)}`)
    })

    it('Exclude Contract From Fee', async() => {
      await frockToken.connect(deployer).excludeFromFees(treasuryContract.address, true)
    })    

    it('Set Deployer as Caller', async() => {
      const CALLER = await treasuryContract.CALLER_ROLE();
      await treasuryContract.connect(deployer).grantRole(CALLER, deployer.address)
    })

    it('Send FROCK to Contract', async() => {
      const amountToSwap = ethers.utils.parseUnits("300", frockDecimals);    
      await frockToken.connect(deployer).transfer(treasuryContract.address, amountToSwap)      
    })    

    it('Failed to Swap And Send', async() => {            
      await expect(
        treasuryContract.connect(deployer).swapAndSend()
      ).to.be.revertedWith('Treasury: Not passing fixed limit token to swap')
    })

    it('Send FROCK to Contract', async() => {
      const amountToSwap = ethers.utils.parseUnits("600", frockDecimals);    
      await frockToken.connect(deployer).transfer(treasuryContract.address, amountToSwap) 
      
      // Now Contract have 900 FROCK
    })

    it('Swap And Send', async() => {
      // 1st Attempt
      const amountToSwap = ethers.utils.parseUnits("500", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("400", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    })  
    
    
    it('Send FROCK to Contract', async() => {
      const amountToSwap = ethers.utils.parseUnits("2600", frockDecimals);    
      await frockToken.connect(deployer).transfer(treasuryContract.address, amountToSwap) 
      
      // Now Contract have 3000 FROCK
    })

    it('Swap And Send', async() => {
      // 1st Attempt
      const amountToSwap = ethers.utils.parseUnits("750", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("2250", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    })  

    it('Swap And Send', async() => {
      // 2nd Attempt
      const amountToSwap = ethers.utils.parseUnits("562.5", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("1687.5", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    }) 

    it('Swap And Send', async() => {
      // 3rd Attempt
      const amountToSwap = ethers.utils.parseUnits("500", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("1187.5", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    }) 

    it('Swap And Send', async() => {
      // 4rd Attempt
      const amountToSwap = ethers.utils.parseUnits("500", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("687.5", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    }) 

    it('Swap And Send', async() => {
      // 5rd Attempt
      const amountToSwap = ethers.utils.parseUnits("500", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(frockBalanceAfter).to.be.eq(ethers.utils.parseUnits("187.5", 9))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    }) 
    
    it('Failed to Swap And Send', async() => {            
      await expect(
        treasuryContract.connect(deployer).swapAndSend()
      ).to.be.revertedWith('Treasury: Not passing fixed limit token to swap')
    })
    
  })
});
