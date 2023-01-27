const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const [deploy] = await ethers.getSigners();
  console.log(`deploying contract with the account: ${deploy.address}`);
  console.log(`Account balance: ${balance.toString()}`);
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  console.log(`Token address: ${token.address}`);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format("json")),
  };
  fs.writeFileSync("Frontend/src/Token.json", JSON.stringify(data));
}

main
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
