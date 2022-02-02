// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Frock is ERC20 {

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        uint256 initialSupply = 1_000_000 * 10**9;
        _mint(_msgSender(), initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 9;
    }
}