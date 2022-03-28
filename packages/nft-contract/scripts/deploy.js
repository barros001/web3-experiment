const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let txn = await nftContract.makeAnEpicNFT();
  await txn.wait();
  console.log("Minted NFT #1");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
