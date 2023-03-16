import "../App.css";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div className="Nav">
        <h2>Logo</h2>
      <ConnectWallet accentColor="#d3d3d3" colorMode="dark" />
    </div>
  );
}