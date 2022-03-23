// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    event NewWave(address indexed from, uint256 timestamp, string message);
    event PrizeAwarded(address indexed to, uint256 timestamp, uint256 prize);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    uint256 totalWaves;

    Wave[] waves;

    address owner;

    uint256 seed;

    mapping(address => uint256) public lastWaveAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        owner = msg.sender;
        seed = (block.difficulty + block.timestamp) % 100;
    }

    function wave(string memory _message) public {
        require(
            msg.sender == owner ||
            lastWaveAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15 minutes"
        );

        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        waves.push(Wave(msg.sender, _message, block.timestamp));

        console.log("%s has waved w/ message \"%s\"!", msg.sender, _message);
        emit NewWave(msg.sender, block.timestamp, _message);

        updateSeed();
        if (seed < 50) {
            awardPrize();
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function updateSeed() internal {
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("New seed value: %d", seed);
    }

    function awardPrize() internal {
        uint256 prize = 0.0001 ether;
        require(prize <= address(this).balance, "Contract does not have enough funds!");
        payable(msg.sender).transfer(prize);
        console.log("%d was just sent to %s", prize, msg.sender);

        emit PrizeAwarded(msg.sender, block.timestamp, prize);
    }

    function drain() public {
        require(msg.sender == owner, "Only the owner can drain this contract");
        payable(owner).transfer(address(this).balance);
    }
}
