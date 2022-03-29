const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  console.log("Max supply:", (await nftContract.MAX_TOKENS()).toString());
  console.log(
    "Total NFTs Minted:",
    (await nftContract.totalSupply()).toString()
  );

  let events = [];

  let txn = await nftContract.makeAnEpicNFT();
  events = events.concat((await txn.wait()).events);
  console.log(
    "Total NFTs Minted:",
    (await nftContract.totalSupply()).toString()
  );

  txn = await nftContract.makeAnEpicNFT();
  events = events.concat((await txn.wait()).events);
  console.log(
    "Total NFTs Minted:",
    (await nftContract.totalSupply()).toString()
  );

  events.forEach((event) => {
    if (event.event === "NewEpicNFTMinted") {
      const [from, tokenId, name, timestamp] = event.args;
      console.log(
        `NewEpicNFTMinted from ${from} with token ID ${tokenId} and name "${name}" @ ${timestamp}`
      );
    }
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
