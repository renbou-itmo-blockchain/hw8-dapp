import { useState } from "react";
import { upload, download } from "./ipfs";
import { put, get } from "./contract";

function App() {
  const [cid, setCID] = useState(() => "");
  const [content, setContent] = useState(() => "");

  const selectFile = async (evt) => {
    const file = evt.target.files[0];
    const cid = await upload(await file.arrayBuffer());
    await put(cid);
    setCID(cid);
  };

  const downloadFile = async () => {
    const cid = await get();
    const file = await download(cid);
    const blob = new Blob(file, { type: "application/octet-stream" });
    setContent(await blob.text());
  };

  return (
    <div className="max-w-[90rem] mx-auto">
      <header className="py-4 mb-2 border-b-2">
        <h1 className="text-center text-3xl font-bold">IPFS DApp Example</h1>
      </header>
      <main>
        <div className="flex flex-col gap-y-8 items-center">
          <div className="border-2 p-2 rounded border-zinc-600">
            <div>
              <label htmlFor="upload" className="mr-8 text-xl">
                Upload
              </label>
              <input type="file" id="upload" onChange={selectFile}></input>
            </div>
            <div>CID: {cid.toString()}</div>
          </div>
          <div className="border-2 p-2 rounded border-zinc-600">
            <button onClick={downloadFile}>Download</button>
            <div>Content: {content.toString()}</div>
          </div>
        </div>
      </main>
      <footer className="max-w-[90%] mx-auto py-4 mt-2 border-t-2 text-center text-md">
        By @renbou
      </footer>
    </div>
  );
}

export default App;
