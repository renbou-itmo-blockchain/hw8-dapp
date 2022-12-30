import * as config from "../config.json";
import * as Storage from "../Storage.json";
import { ethers } from "ethers";
import { CID } from "kubo-rpc-client";

const provider = new ethers.providers.JsonRpcProvider(config.node);
const signer = new ethers.Wallet(config.privateKey, provider);
const contract = new ethers.Contract(config.contract, Storage.abi, signer);

async function put(cid) {
  await contract.put(cid.bytes);
}

async function get() {
  const bytes = await contract.get();
  return CID.decode(ethers.utils.arrayify(bytes));
}

export { put, get };
