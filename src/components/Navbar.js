import "../App.css";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div className="Nav">
      <ConnectWallet accentColor="#d3d3d3" colorMode="dark" />
    </div>
  );
}
