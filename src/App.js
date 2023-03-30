import { create } from "ipfs-http-client";
import "./App.css";
import { useState } from "react";
import Swal from 'sweetalert2'
import {
  useContract,
  useContractWrite,
  ChainId,
  useNetwork,
  useChainId,
  useContractRead,
} from "@thirdweb-dev/react";
import Navbar from "./components/Navbar";

const { REACT_APP_projectId, REACT_APP_projectSecret } = process.env;

// authentication
const auth =
  "Basic " +
  Buffer.from(REACT_APP_projectId + ":" + REACT_APP_projectSecret).toString(
    "base64"
  );

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});

function App() {
  const { contract } = useContract(
    "0xb71DC906d776D7CaF8F4c0f6e9012fE135e27452"
  );
  const [entry, setentry] = useState(0);

  const [file, setfile] = useState();
  const [{loading},switchNetwork] = useNetwork();

  const chainId = useChainId();
  const { mutateAsync: addFile } = useContractWrite(contract, "addFile");

  const { data } = useContractRead(contract, "retrieveFile", entry);

  const handleGetFile = () => {
    document.getElementById("entry").innerHTML = data;
  };

  let link = "";
  console.log("ChainId", chainId);

  const addfile = async () => {
    try {
      const dataLink = await addFile([link]);
      Swal.fire('The file has been uploaded successfully')
      console.info("contract call successs", dataLink);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleClick = async () => {
    console.log(file);
    const add = await client.add(file);
    link = `https://ipfs.io/ipfs/${add.path}`;
    console.log(link);
    const addfilewait = await addfile();
    console.log(addfilewait);
    document.getElementById("link").innerHTML = link;
  };

  return (
    <div className="App">
      <Navbar />
      <h1>File Uploader</h1>
      <br />
      {chainId == 5 ? (
        <>
          <input
            placeholder="Select the file"
            type="file"
            onChange={(e) => setfile(e.target.files[0])}
          />
          <br />
          <button type="button" onClick={handleClick}>
            Upload
          </button>
          <br />
          <br />
          <p href={link} id="link"></p>
          <hr />
          <br />
          <h1>File Retriever</h1>
          <br />
          <input
            placeholder="Enter the File id"
            type="text"
            onChange={(e) => setentry(e.target.value)}
          />
          <button onClick={handleGetFile}>Retrieve link</button>
          <div id="entry"></div>
        </>
      ) : (
        <>
        <p>You are on the wrong chain.</p>
        <button onClick={() => switchNetwork?.(ChainId.Goerli)}>
          Switch to Goerli
        </button>
        </>
      )}
      <br />
    </div>
  );
}

export default App;
