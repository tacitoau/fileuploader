import { create } from "ipfs-http-client";
import "./App.css";
import { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Navbar from "./components/Navbar";

const { REACT_APP_projectId, REACT_APP_projectSecret } = process.env;

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/ap/v0");

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
  const { mutateAsync: addFile, isLoading } = useContractWrite(
    contract,
    "addFile"
  );

  const [file, setfile] = useState();
  // console.log(contract)
  // console.log(isLoading)

  let link = "";

  const addfile = async () => {
    try {
      const data = await addFile([link]);
      console.info("contract call successs", data);
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
      <br />
      <p href={link} id="link"></p>
    </div>
  );
}

export default App;
