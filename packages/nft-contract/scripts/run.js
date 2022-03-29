const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  console.log("Max supply:", (await nftContract.MAX_TOKENS()).toString());
  console.log("Total NFTs Minted:", (await nftContract.totalSupply()).toString());

  let txn = await nftContract.makeAnEpicNFT();
  await txn.wait();
  console.log("Total NFTs Minted:", (await nftContract.totalSupply()).toString());

  txn = await nftContract.makeAnEpicNFT();
  await txn.wait();
  console.log("Total NFTs Minted:", (await nftContract.totalSupply()).toString());
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
