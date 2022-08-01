// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Lock {
    int private count = 0;

    function incrementCounter() external {
        count += 1;
    }
    function decrementCounter() external {
        count -= 1;
    }

    function setCounter() public view returns (int) {
        return count;
    }

}