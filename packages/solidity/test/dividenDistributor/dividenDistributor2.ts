import { calculateDividen } from "../utils/calculations";
import { SignerWithAddress } from "../utils/interfaces";
import {
  DividenDistributorProxy,
  DividenDistributorV1,
  FrockTokenV1,
  FrockProxy,
  SpookyRouter,
  SpookyFactory
} from "@project/contracts/typechain/generated";
import { expect } from "chai";
import { deployments, ethers, upgrades, network } from "hardhat";


describe("Dividend Distributor 2", async () => {  
  let deployer: SignerWithAddress;  
  let user1: SignerWithAddress;  
  let user2: SignerWithAddress;  
  let rewarder1: SignerWithAddress;  
  let rewarder2: SignerWithAddress;  
  let rewarder3: SignerWithAddress;  
  let liquidityProvider: SignerWithAddress;
  let othersAccount: SignerWithAddress;
  let frockToken: FrockTokenV1
  let frockProxy: FrockProxy
  let dividenDistributor: DividenDistributorV1
  let dividenDistributorProxy: DividenDistributorProxy
  let frockDecimals: number;
  let spookyRouter: SpookyRouter;
  let spookyFactory: SpookyFactory;

  before(async () => {
    await deployments.fixture(["DividenDistributor"], {
      keepExistingDeployments: true,
    });

    // Get Frock Contract
    frockProxy = await ethers.getContract<FrockProxy>('FrockProxy');
    frockToken = (await ethers.getContract<FrockTokenV1>('FrockTokenV1')).attach(frockProxy.address);
    frockDecimals = await frockToken.decimals();
    // Dividen Distributor Contract
    dividenDistributorProxy = await ethers.getContract<DividenDistributorProxy>('DividenDistributorProxy');
    dividenDistributor = (await ethers.getContract<DividenDistributorV1>('DividenDistributorV1')).attach(dividenDistributorProxy.address);
    // Get Spooky DEX
    spookyRouter = await ethers.getContract<SpookyRouter>('SpookyRouter');
    spookyFactory = await ethers.getContract<SpookyFactory>('SpookyFactory');

    ({
      deployer,    
      user1, 
      user2, 
      user11 : rewarder1,
      user12 : rewarder2,
      user13 : rewarder3,
      user14 : liquidityProvider,
      user15 : othersAccount,
    } = await ethers.getNamedSigners());
  });

  describe("Reward Share Mode 0", async () => { 
    it('Deployer share tokens', async() => {
      // Share token to others 
      await frockToken.connect(deployer).transfer(user1.address, ethers.utils.parseUnits("100000", frockDecimals))
      await frockToken.connect(deployer).transfer(user2.address, ethers.utils.parseUnits("100000", frockDecimals))
      await frockToken.connect(deployer).transfer(rewarder1.address, ethers.utils.parseUnits("100000", frockDecimals))            
      await frockToken.connect(deployer).transfer(rewarder2.address, ethers.utils.parseUnits("100000", frockDecimals))            
      await frockToken.connect(deployer).transfer(rewarder3.address, ethers.utils.parseUnits("100000", frockDecimals))            
      await frockToken.connect(deployer).transfer(liquidityProvider.address, ethers.utils.parseUnits("100000", frockDecimals))            

      // Exclude From Fee
      await frockToken.connect(deployer).excludeFromFees(liquidityProvider.address, true);
    }) 
    it('Set Rewarder Role', async() => {
      const REWARDER_ROLE = await dividenDistributor.REWARDER_ROLE();
      await dividenDistributor.connect(deployer).grantRole(REWARDER_ROLE, rewarder1.address);
      await dividenDistributor.connect(deployer).grantRole(REWARDER_ROLE, rewarder2.address);
      await dividenDistributor.connect(deployer).grantRole(REWARDER_ROLE, rewarder3.address);
    })
    it('Make Liquidity Pool', async() => {
      const deadline = (await ethers.provider.getBlock("latest")).timestamp + 10;
      await frockToken.connect(liquidityProvider).approve(spookyRouter.address, ethers.utils.parseUnits("9000", frockDecimals))
      await spookyRouter.connect(liquidityProvider).addLiquidityETH(
        frockToken.address,
        ethers.utils.parseUnits("9000", frockDecimals), 
        0,
        0, 
        liquidityProvider.address, 
        deadline, {
          value : ethers.utils.parseUnits("9000")
        })

        const pairAddress = await spookyFactory.getPair(frockToken.address, (await spookyRouter.WETH()));
        console.log("Pair Address:")
        console.log(`Balance Frock of Pair : ${await frockToken.balanceOf(pairAddress)}`)
    })   
    it('Share First Reward mode 0', async() => {   
      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())    
      // Create Balance on Dividen Distributor
      await frockToken.connect(rewarder1).transfer(othersAccount.address, ethers.utils.parseUnits("1000", frockDecimals));    
      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())
      // Share Reward
      await dividenDistributor.connect(rewarder1).swapAndShareReward();   
      
      const rewardId = 0;
      const reward = await dividenDistributor.rewards(rewardId);
      console.log(`Reward 0 : ${reward}`)

      // Check Building Trade Dividend Of Holder
      const buildingTradeDividend = await dividenDistributor.buildingTradeDividendOfHolder(user1.address)
      const balanceOfDividenDistributor = await frockToken.balanceOf(dividenDistributor.address)
      const balanceOfHolder = await frockToken.balanceOf(user1.address)
      const totalSupply = ethers.utils.parseUnits("1000000", frockDecimals)
      const calculateBuildingTrade = balanceOfDividenDistributor.mul(balanceOfHolder).div(totalSupply)
      expect(buildingTradeDividend).to.be.eq(calculateBuildingTrade)
    
    })

    it('Share Second Reward mode 0', async() => {    
      // Time travel
      const latestBlock = await ethers.provider.getBlock("latest")
      const latestTimestamp = latestBlock.timestamp
      const timeDestination = latestTimestamp + (2 * 3600) + 1
      await network.provider.send('evm_setNextBlockTimestamp', [timeDestination]);
  
    
      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())    
      // Create Balance on Dividen Distributor
      await frockToken.connect(rewarder2).transfer(othersAccount.address, ethers.utils.parseUnits("1000", frockDecimals));    
      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())  
      // Share Reward
      await dividenDistributor.connect(rewarder2).swapAndShareReward();     
      
      const rewardId = 1;
      const reward = await dividenDistributor.rewards(rewardId);
      console.log(`Reward 1 : ${reward}`)

      // Check Building Trade Dividend Of Holder
      const buildingTradeDividend = await dividenDistributor.buildingTradeDividendOfHolder(user1.address)
      const balanceOfDividenDistributor = await frockToken.balanceOf(dividenDistributor.address)
      const balanceOfHolder = await frockToken.balanceOf(user1.address)
      const totalSupply = ethers.utils.parseUnits("1000000", frockDecimals)
      const calculateBuildingTrade = balanceOfDividenDistributor.mul(balanceOfHolder).div(totalSupply)
      expect(buildingTradeDividend).to.be.eq(calculateBuildingTrade)
    
    })
    it('Share Third Reward mode 0', async() => {   
       // Time travel
       const latestBlock = await ethers.provider.getBlock("latest")
       const latestTimestamp = latestBlock.timestamp
       const timeDestination = latestTimestamp + (2 * 3600) + 1
       await network.provider.send('evm_setNextBlockTimestamp', [timeDestination]);

      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())    
      // Create Balance on Dividen Distributor
      await frockToken.connect(rewarder3).transfer(othersAccount.address, ethers.utils.parseUnits("1000", frockDecimals));    
      console.log('Dividen Distributor balances : ', (await frockToken.balanceOf(dividenDistributor.address)).toString())    
      // Share Reward
      await dividenDistributor.connect(rewarder3).swapAndShareReward();      

      const rewardId = 2;
      const reward = await dividenDistributor.rewards(rewardId);
      console.log(`Reward 2 : ${reward}`)

      // Check Building Trade Dividend Of Holder
      const buildingTradeDividend = await dividenDistributor.buildingTradeDividendOfHolder(user1.address)
      const balanceOfDividenDistributor = await frockToken.balanceOf(dividenDistributor.address)
      const balanceOfHolder = await frockToken.balanceOf(user1.address)
      const totalSupply = ethers.utils.parseUnits("1000000", frockDecimals)
      const calculateBuildingTrade = balanceOfDividenDistributor.mul(balanceOfHolder).div(totalSupply)
      expect(buildingTradeDividend).to.be.eq(calculateBuildingTrade)
    })

    it('Users Claim the Second Reward', async() => {      
      const reward0 = await dividenDistributor.rewards(0);            
      const reward1 = await dividenDistributor.rewards(1);            
      const reward2 = await dividenDistributor.rewards(2);   
            
      const totalSupplyAt0 = (await frockToken.totalSupplyAt(reward0[3]))
      const totalSupplyAt1 = (await frockToken.totalSupplyAt(reward1[3]))
      const totalSupplyAt2 = (await frockToken.totalSupplyAt(reward2[3]))      

      // Check Total Unclaimed Reward on Contract
      const getRewardIdsUnclaimed = await dividenDistributor.getRewardIdsUnclaimed(user1.address, 0);
      const getTotalUnclaimedReward = await dividenDistributor.getTotalUnclaimedReward(user1.address, 0);

      const sumTotalUnclaimedReward = reward0[0].add(reward1[0]).add(reward2[0]);      
      const frockOfUser1 = await frockToken.balanceOfAt(user1.address, reward1[3])
      const dividenForUser1 =  calculateDividen(reward1[0], frockOfUser1, totalSupplyAt1)
      const totalDividenForUser1 = calculateDividen(sumTotalUnclaimedReward, frockOfUser1, ethers.utils.parseUnits("1000000", frockDecimals));
      const ftmOfUser1Before = await ethers.provider.getBalance(user1.address)
      
      expect(getRewardIdsUnclaimed.length).to.be.eq(3)
      expect(totalDividenForUser1).to.be.eq(getTotalUnclaimedReward)

      await dividenDistributor.connect(user1).claimReward(1); // Claim Second Reward

      const user1TotalClaim = await dividenDistributor.holderToTotalClaimed(user1.address, 0);
      const getRewardIdsUnclaimedAfter = await dividenDistributor.getRewardIdsUnclaimed(user1.address, 0);
      const getTotalUnclaimedRewardAfter = await dividenDistributor.getTotalUnclaimedReward(user1.address, 0);
      const estimateGas = ethers.utils.parseUnits("0.0002")
      const ftmOfUser1After = await ethers.provider.getBalance(user1.address)

      expect(user1TotalClaim).to.be.eq(dividenForUser1)
      expect(getRewardIdsUnclaimedAfter.length).to.be.eq(2)
      expect(totalDividenForUser1).to.be.eq(getTotalUnclaimedRewardAfter.add(dividenForUser1))
      expect(ftmOfUser1After).to.be.gte(ftmOfUser1Before.add(dividenForUser1).sub(estimateGas))
    })

    it('Users Batch Claim the First & Third Reward', async() => {
      const user1TotalClaimBefore = await dividenDistributor.holderToTotalClaimed(user1.address, 0);
      const ftmOfUser1Before = await ethers.provider.getBalance(user1.address)

      // Batch Claim
      const getRewardIdsUnclaim = await dividenDistributor.getRewardIdsUnclaimed(user1.address, 0);
      await dividenDistributor.connect(user1).batchClaimReward(getRewardIdsUnclaim)

      // Check Values
      const user1TotalClaimAfter = await dividenDistributor.holderToTotalClaimed(user1.address, 0);
      const getRewardIdsUnclaimedAfter = await dividenDistributor.getRewardIdsUnclaimed(user1.address, 0);
      const getTotalUnclaimedRewardAfter = await dividenDistributor.getTotalUnclaimedReward(user1.address, 0);

      // Get Reward
      const reward0 = await dividenDistributor.rewards(0);                        
      const reward2 = await dividenDistributor.rewards(2);   

      // User 1 Hold 10% of Token
      const dividenForUser1 = calculateDividen(
        reward0[0].add(reward2[0]), // Reward0 & 2
        ethers.utils.parseUnits("100000", frockDecimals), // token hold by user 1
        ethers.utils.parseUnits("1000000", frockDecimals) // total supply
      );

      const estimateGas = ethers.utils.parseUnits("0.0002")
      const ftmOfUser1After = await ethers.provider.getBalance(user1.address)
      
      expect(user1TotalClaimAfter).to.be.eq(user1TotalClaimBefore.add(dividenForUser1))
      expect(getRewardIdsUnclaimedAfter.length).to.be.eq(0)    
      expect(getTotalUnclaimedRewardAfter).to.eq(0);
      expect(ftmOfUser1After).to.be.gte(ftmOfUser1Before.add(dividenForUser1).sub(estimateGas))
    })  

    it('Trying to Batch Claim reward that already claimed', async() => {  

      // User will not get any reward because reward already claimed
      const ftmOfUser1Before = await ethers.provider.getBalance(user1.address)

      // Claim Reward
      await dividenDistributor.connect(user1).batchClaimReward([0,1,2])
      
      // Check Values
      const estimateGas = ethers.utils.parseUnits("0.0002")
      const ftmOfUser1After = await ethers.provider.getBalance(user1.address)
      expect(ftmOfUser1After).to.be.lte(ftmOfUser1Before)
  
    })
  })  
});
