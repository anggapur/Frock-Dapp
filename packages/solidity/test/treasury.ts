import { calculateDividen } from "./utils/calculations";
import { SignerWithAddress } from "./utils/interfaces";
import {
  TreasuryProxy,
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
  let treasuryProxy: TreasuryProxy  
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
    treasuryProxy = await ethers.getContract<TreasuryProxy>('TreasuryProxy');
    treasuryContract = (await ethers.getContract<TreasuryV1>('TreasuryV1')).attach(treasuryProxy.address);

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
      const amountToSwap = ethers.utils.parseUnits("50", frockDecimals);    
      await frockToken.connect(deployer).transfer(treasuryContract.address, amountToSwap)      
    })

    

    it('Swap And Share', async() => {
      const amountToSwap = ethers.utils.parseUnits("50", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    })

    it('Send FROCK to Contract', async() => {
      const amountToSwap = ethers.utils.parseUnits("1000", frockDecimals);
      await frockToken.connect(deployer).transfer(treasuryContract.address, amountToSwap)
    })

    it('Swap And Share', async() => {
      const amountToSwap = ethers.utils.parseUnits("100", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)
    })
    
    it('Change Maximum Swap And Swap', async() => {
      // Change Maximum Swap
      const newMaximum = ethers.utils.parseUnits("200", 9);
      await treasuryContract.connect(deployer).setMaximumTokenToSwap(newMaximum)

      // Swap
      const amountToSwap = ethers.utils.parseUnits("200", frockDecimals);

      const frockBalanceBefore = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestBefore = await ethers.provider.getBalance(treasuryDestination.address)
      await treasuryContract.connect(deployer).swapAndSend()
      const frockBalanceAfter = await frockToken.balanceOf(treasuryContract.address)
      const ftmOfTreasuryDestAfter = await ethers.provider.getBalance(treasuryDestination.address)

      expect(frockBalanceAfter).to.be.eq(frockBalanceBefore.sub(amountToSwap))
      expect(ftmOfTreasuryDestAfter).to.gt(ftmOfTreasuryDestBefore)

    })
  })
});
