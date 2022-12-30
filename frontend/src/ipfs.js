import * as config from "../config.json";
import { create } from "kubo-rpc-client";

const ipfs = create({ url: config.ipfs });

async function upload(data) {
  const { cid } = await ipfs.add(data);
  return cid;
}

async function download(cid) {
  const data = [];
  for await (const chunk of ipfs.cat(cid)) {
    data.push(chunk);
  }

  return data;
}

export { upload, download };
