import { create } from "ipfs-http-client";
import "./App.css";
import { useState } from "react";

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
  const [file, setfile] = useState();

  const handleClick = async () => {
    console.log(file);
    const add = await client.add(file);
    const url = `https://ipfs.io/ipfs/${add.path}`;
    console.log(url);
  };
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
