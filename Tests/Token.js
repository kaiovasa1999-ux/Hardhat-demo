const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    [owner, addr1, addr2] = await ethers.getSigner();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
  });

  it("shoult assignt the total supply to the owner", async () => {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totaSupply()).to.equal(ownerBalance);
  });

  describe("Transactions", async () => {
    it("should transfer tokens between accounts", async () => {
      await token.connect(addr1).transfer(addr2.address, 10);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(10);
    });

    it("should fail if sender does not have enought tokens in his balance", async () => {
      const initialBalanceOwner = await token.balanceOf(owner.address);
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enougt tokens");

      expect(
        await token.balanceOf(owner.address).to.equal(initialBalanceOwner)
      );
    });

    it(
      ("should balance updete proper after the transaction",
      async () => {
        const initialBalanceOwner = await token.balanceOf(owner.address);
        await token.transfer(addr1.address, 100);
        await token.transfer(addr2.transfer, 50);

        const finalOwnerBalance = await token.balanceOf(owner.address);
        expect(finalOwnerBalance).to.equal(initialBalanceOwner - 150);

        const addr1Balance = await token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100);

        const addr2Balance = await token.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
      })
    );
  });
});
