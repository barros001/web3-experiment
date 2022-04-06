const hre = require("hardhat");

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Pinky", "Dexter", "Johnny Bravo"],
    [
      "QmafBk5GXj39NDCbCS9TaTH8xoUftdyTuQLEuA7p3hJMCg",
      "QmcP3VqqdtvNskWitCrw6ogrTVRvZBr6xZb44WZx2JvfzQ",
      "QmRQJsAobq1ayz1ftZoekx6rG5zyWvGu6MFKpC4KbubHGi",
    ],
    [100, 200, 300], // HP values
    [100, 50, 25], // Attack damage values
    "Gizmo", // Boss name
    "QmT8nhL8NKevEyE6NYs67KurEueSjtmvnTgc2uu9cXvnaF", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
