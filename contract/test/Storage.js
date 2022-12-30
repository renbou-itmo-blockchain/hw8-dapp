const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
  async function deployStorageFixture() {
    const [owner, other] = await ethers.getSigners();

    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();

    return { owner, other, storage };
  }

  it("Should deploy", async function () {
    await loadFixture(deployStorageFixture);
  });

  describe("put & get", function () {
    it("Should work for one user", async function () {
      const { owner, storage } = await loadFixture(deployStorageFixture);
      const data = Uint8Array.from([1, 3, 3, 7]);

      // Putting arbitrary data as any user should work
      await storage.connect(owner).put(data);

      // The same user should be able to retrieve the data
      expect(await storage.connect(owner).get()).to.equal(
        "0x" + Buffer.from(data).toString("hex")
      );
    });

    it("Shouldn't mix up different users data", async function () {
      const { owner, other, storage } = await loadFixture(deployStorageFixture);
      const data1 = Uint8Array.from([1, 3, 3, 7]);
      const data2 = Uint8Array.from([4, 2]);

      // Different users should be able to store their data
      await storage.connect(owner).put(data1);
      await storage.connect(other).put(data2);

      // And then retrieve their own data
      expect(await storage.connect(owner).get()).to.equal(
        "0x" + Buffer.from(data1).toString("hex")
      );

      expect(await storage.connect(other).get()).to.equal(
        "0x" + Buffer.from(data2).toString("hex")
      );
    });
  });
});
