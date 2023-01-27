// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Toke {
    string public name = "kaiovasa Token";
    string public symol = "K";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        // console.log('sender balance is %s tokens', balances[msg.sender]);
        // console.log('try to send %s',amount,to);

        require(balances[msg.sender] >= amount, "Not enoutht Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
