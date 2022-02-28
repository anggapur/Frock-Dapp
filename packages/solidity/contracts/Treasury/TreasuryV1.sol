// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswapV2Router02.sol";

contract TreasuryV1 is              
    AccessControl    
{
    bool private inSwap;
    uint256 minimumTokenToSwap; // maximum token that able to swap at one time
    uint256 fixedLimitTokenToSwap; // fixed limit token to swap
    uint256 percentageToSwap; // 2 digits _00
    address mainToken; // Frock Token Address
    address treasuryDestination; // FTM will be sent to this address after swap
    bytes32 public constant CALLER_ROLE = keccak256("CALLER");
    IUniswapV2Router02 public uniswapV2Router;

    modifier lockTheSwap {
        inSwap = true;
        _;
        inSwap = false;
    }

    event SwapAndSend(uint256 amountToSwap, uint256 ftmBalanceAmount, address treasuryDestination);
    event Withdraw(uint256 ftmBalanceAmount, address treasuryDestination);
    event WithdrawToken(uint256 amount, address destination);
    event UpdateMainToken(address newMainTokenAddress);
    event UpdateTreasuryDestination(address newTreasuryDestination);
    event UpdateMinimumTokenToSwap(uint256 newMinimumTokenToSwap);
    event UpdateFixedTokenToSwap(uint256 newFixedTokenToSwap);
    event UpdatePercentageTokenToSwap(uint256 newPercentageTokenToSwap);    
    
    // Initialize
    constructor(
        uint256 _minimumTokenToSwap,
        uint256 _fixedLimitTokenToSwap,
        uint256 _percentageToSwap,
        address _mainToken,
        address _treasuryDestination
    ) {       

        // Setup deployer as Admin when construction
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());        
        
        uniswapV2Router = IUniswapV2Router02(0xF491e7B69E4244ad4002BC14e878a34207E38c29);        
        inSwap = false;
        
        minimumTokenToSwap = _minimumTokenToSwap;
        fixedLimitTokenToSwap = _fixedLimitTokenToSwap;
        percentageToSwap = _percentageToSwap;
        mainToken = _mainToken;
        treasuryDestination = _treasuryDestination;
    }  

    /**
     * @dev Swap Frock token on DEX and send the FTM to treasuryDestination
     * @dev Maximum amount of swap based on maximumTokenToSwap
     */
    function swapAndSend() external onlyRole(CALLER_ROLE) {  
        require(mainToken != address(0), "Treasury: Main Token not setted yet");
        require(treasuryDestination != address(0), "Treasury : Destination not setted yet");        
        require(minimumTokenToSwap > 0, "Treasury: Minimum Token to Swap not setted yet");         
        require(getTokenBalance() > minimumTokenToSwap, "Treasury: Not passing minimum token");
        require(getTokenBalance() >= fixedLimitTokenToSwap, "Treasury: Not passing fixed limit token to swap");

        uint256 percentageAmountToSwap = getTokenBalance() * percentageToSwap / 10000;
        uint256 amountToSwap = percentageAmountToSwap >= fixedLimitTokenToSwap ? percentageAmountToSwap : fixedLimitTokenToSwap;

        // Swap        
        _swapTokensForEth(amountToSwap);

        uint256 ftmBalanceAmount = getBalance();     

        // Send FTM
        _safeTransferETH(treasuryDestination, ftmBalanceAmount);

        emit SwapAndSend(amountToSwap, ftmBalanceAmount, treasuryDestination);
    }    

    /**
     * @dev Withdraw FTM to treasuryDestination address
     */
    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 ftmBalanceAmount = getBalance();  
        // Send FTM
        _safeTransferETH(treasuryDestination, ftmBalanceAmount);

        emit Withdraw(ftmBalanceAmount, treasuryDestination);
    }

     /**
     * @dev Withdraw Main Token
     */
    function withdrawToken(address destination, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {        
        // Send Token
        require(
            IERC20(mainToken).transfer(destination, amount), "Treasury: Fail Transfer Token"
        );        
        emit WithdrawToken(amount, destination);
    }
      
    /**
     * @dev Swap FROCK to DEX to FTM
     */        
    function _swapTokensForEth(uint256 tokenAmount) private lockTheSwap {
        address[] memory path = new address[](2);
        path[0] = address(mainToken);
        path[1] = uniswapV2Router.WETH();
        IERC20(mainToken).approve(address(uniswapV2Router), tokenAmount);
        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }
    

    /**
     * @dev Get total amount of FROCK that owned by this contract
     */
    function getTokenBalance() public view returns(uint256 tokenAmount) {
        return IERC20(mainToken).balanceOf(address(this));
    }

    /**
     * @dev Get total amount of FTM that owned by this contract
     */
    function getBalance() public view returns(uint256 balance) {
        return address(this).balance;
    }

    /**
     * @dev Set main token (FROCK token) address
     */
    function setMainToken(address tokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        mainToken = tokenAddress;
        emit UpdateMainToken(tokenAddress);
    }

    /** 
     * @dev Set treasuryDestination Address
     */
    function setTreasuryDestination(address newTreasuryDestination) external onlyRole(DEFAULT_ADMIN_ROLE) {
        treasuryDestination = newTreasuryDestination;
        emit UpdateTreasuryDestination(newTreasuryDestination);
    }

    /**
     * @dev Set Minimum Token of mainToken that should owned to swap
     */
    function setMinimumTokenToSwap(uint256 newMinimumTokenToSwap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minimumTokenToSwap = newMinimumTokenToSwap;
        emit UpdateMinimumTokenToSwap(newMinimumTokenToSwap);
    }

     /**
     * @dev Set Fixed Token of mainToken that able to swap at once
     */
    function setFixedTokenToSwap(uint256 newFixedTokenToSwap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        fixedLimitTokenToSwap = newFixedTokenToSwap;
        emit UpdateFixedTokenToSwap(newFixedTokenToSwap);
    }


     /**
     * @dev Set Percentage of Token to Swap
     */
    function setPercentageTokenToSwap(uint256 newPercentageTokenToSwap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        percentageToSwap = newPercentageTokenToSwap;
        emit UpdatePercentageTokenToSwap(newPercentageTokenToSwap);
    }

    /**
     * @dev Function to Transfer FTM
     */
    function _safeTransferETH(address to, uint value) internal {
        (bool success,) = to.call{value:value}(new bytes(0));
        require(success, 'Treasury: ETH_TRANSFER_FAILED');
    }        
    
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
