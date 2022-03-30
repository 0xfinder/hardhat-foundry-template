import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Waifu");

        const hardhatToken = await Token.deploy("Waifu", "WAIFU", 69);

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Waifu");

        const hardhatToken = await Token.deploy("Waifu", "WAIFU", 69);

        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 5);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(5);
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(69 - 5);

        // Transfer 50 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(69 - 5);
    });
});
