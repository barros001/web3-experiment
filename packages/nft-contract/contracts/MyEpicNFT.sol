// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    uint public constant MAX_TOKENS = 50;

    Counters.Counter private _tokenIds;

    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[][] words = [
    ["Rebuild", "Wind", "Fulfil", "Watch", "Close", "Calculate", "Compensate", "Interrupt", "Smash", "Understand", "Command", "Acknowledge", "Date", "Consume", "Accompany", "Elect", "Reckon", "Cause", "Effect", "Produce", "Tend", "Contrast", "Base", "Receive", "Assert", "Mount", "Sink", "Alter", "Account", "Claim"],
    ["Strange", "Untidy", "Terrific", "Powerful", "Disgusted", "Quixotic", "Therapeutic", "Axiomatic", "Defective", "Innocent", "Real", "Horrible", "Elite", "Thundering", "Hungry", "Uneven", "Righteous", "Available", "Wretched", "Verdant", "Zippy", "Torpid", "Peaceful", "Elegant", "Seemly", "Bad", "Married", "Two", "True", "Trashy"],
    ["Disaster", "Alcohol", "Artisan", "Hall", "World", "Hotel", "User", "Permission", "Recipe", "Potato", "Guitar", "Agreement", "Industry", "Nation", "Attention", "Revenue", "Fishing", "Homework", "Reputation", "Response", "Youth", "Attitude", "Cigarette", "College", "Tongue", "Music", "Bedroom", "Breath", "Method", "Significance"]
    ];

    event NewEpicNFTMinted(address sender, uint256 tokenId, string name, uint256 timestamp);

    constructor() ERC721 ("BravoNFT", "BRAVO") {
        console.log("This is my NFT contract. Whoa!");
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function makeAnEpicNFT() public {
        require(totalSupply() < MAX_TOKENS, "No more goodies left!");

        uint256 newItemId = _tokenIds.current();

        string memory first = pickRandomWord(0, newItemId);
        string memory second = pickRandomWord(1, newItemId);
        string memory third = pickRandomWord(2, newItemId);
        string memory combinedWord = string(abi.encodePacked(first, second, third));

        string memory finalSvg = string(abi.encodePacked(baseSvg, combinedWord, "</text></svg>"));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );
        console.log("--------------------\n");

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, finalTokenUri);
        _tokenIds.increment();

        emit NewEpicNFTMinted(msg.sender, newItemId, combinedWord, block.timestamp);

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    }

    function pickRandomWord(uint256 index, uint256 tokenId) internal view returns (string memory) {
        uint256 rand = random(string(abi.encodePacked(Strings.toString(index), Strings.toString(tokenId))));
        rand = rand % words[index].length;

        return words[index][rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}
