const hre = require("hardhat");

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(waveContract.address)
    )
  );

  waveContract.on("NewWave", (event) => {
    console.log("Event received:", event);
  });

  let events = [];

  await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("a message from owner");
  events = events.concat((await waveTxn.wait()).events);

  waveTxn = await waveContract.wave("another message from owner");
  events = events.concat((await waveTxn.wait()).events);

  waveTxn = await waveContract.connect(randomPerson).wave("another message");
  events = events.concat((await waveTxn.wait()).events);

  try {
    waveTxn = await waveContract
      .connect(randomPerson)
      .wave("another message from a random person");
    events = events.concat((await waveTxn.wait()).events);
  } catch (e) {
    console.log(
      "Second wave from random person failed, as expected:",
      e.message
    );
  }

  const totalWaves = await waveContract.getTotalWaves();
  const waves = await waveContract.getAllWaves();

  console.log(`${totalWaves} waves:`, waves);
  events.forEach((event) => {
    if (event.event === "NewWave") {
      const [from, timestamp, message] = event.args;
      console.log(
        `Event from ${from} with message "${message}" @ ${timestamp}`
      );
    } else if (event.event === "PrizeAwarded") {
      const [to, timestamp, amount] = event.args;
      console.log(
        `Prize awarded event to ${to} with amount "${amount}" @ ${timestamp}`
      );
    }
  });

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(waveContract.address)
    )
  );

  console.log("Draining contract");

  console.log(
    "Owner balance:",
    hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(owner.address)
    )
  );

  await waveContract.drain();

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(waveContract.address)
    )
  );

  console.log(
    "Owner balance:",
    hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(owner.address)
    )
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
