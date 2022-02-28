// SPDX-License-Identifier: MIT
pragma solidity 0.8.5;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../EIP/SafeTokenRecoverUpgradeable.sol";
import "./IUniswapV2Router02.sol";

contract TreasuryV1 is      
    Initializable,
    UUPSUpgradeable,
    AccessControlUpgradeable,
    SafeTokenRecoverUpgradeable 
{
    bool private inSwap;
    uint256 maximumTokenToSwap; // maximum token that able to swap at one time
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
    event UpdateMainToken(address newMainTokenAddress);
    event UpdateTreasuryDestination(address newTreasuryDestination);
    event UpdateMaximumTokenToSwap(uint256 newMaximumTokenToSwap);
    
    // Initialize
    function initialize(
        uint256 _maximumTokenToSwap,
        address _mainToken,
        address _treasuryDestination
    ) external initializer {        

        __AccessControl_init_unchained();
        __Context_init_unchained();
        __SafeTokenRecover_init_unchained();        

        // Setup deployer as Admin when construction
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(RESCUER_ROLE, _msgSender());
        
        uniswapV2Router = IUniswapV2Router02(0xF491e7B69E4244ad4002BC14e878a34207E38c29);
        maximumTokenToSwap = 0;
        inSwap = false;

        maximumTokenToSwap = _maximumTokenToSwap;
        mainToken = _mainToken;
        treasuryDestination = _treasuryDestination;
    }

    /**
     * @dev Override function when contract upgraded
     */
    function _authorizeUpgrade(address newImplementation) internal override {
        require(
            newImplementation != address(0),
            "Treasury: Cannot zero address"
        );
        require(
            _msgSender() == _getAdmin(),
            "Treasury: Not the Owner of Contract"
        );
    } // solhint-disable-line no-empty-blocks    

    /**
     * @dev Swap Frock token on DEX and send the FTM to treasuryDestination
     * @dev Maximum amount of swap based on maximumTokenToSwap
     */
    function swapAndSend() external onlyRole(CALLER_ROLE) {  
        require(mainToken != address(0), "Treasury: Main Token not setted yet");
        require(treasuryDestination != address(0), "Treasury : Destination not setted yet");        
        require(maximumTokenToSwap > 0, "Treasury: Maximum Token to Swap not setted yet");         

        uint256 amountToSwap = getTokenBalance() > maximumTokenToSwap ? maximumTokenToSwap : getTokenBalance();

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
     * @dev Swap FROCK to DEX to FTM
     */        
    function _swapTokensForEth(uint256 tokenAmount) private lockTheSwap {
        address[] memory path = new address[](2);
        path[0] = address(mainToken);
        path[1] = uniswapV2Router.WETH();
        IERC20Upgradeable(mainToken).approve(address(uniswapV2Router), tokenAmount);
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
        return IERC20Upgradeable(mainToken).balanceOf(address(this));
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
     * @dev Set Maximum Token of mainToken that able to swap at once
     */
    function setMaximumTokenToSwap(uint256 newMaximumTokenToSwap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        maximumTokenToSwap = newMaximumTokenToSwap;
        emit UpdateMaximumTokenToSwap(newMaximumTokenToSwap);
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
