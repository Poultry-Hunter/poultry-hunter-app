import React from "react";
import "./connectWallet.css";
import { ReactComponent as StarManSvg } from "../../assets/images/vector-art/starman.svg";
import logo from "../../assets/images/logo/logo.svg";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function ConnectWallet() {
  const { connected, publicKey, sendTransaction, ready } = useWallet();
  const { connection } = useConnection();

  return (
    <div className="connect_wallet_container container">
      <div className="connect_wallet_left_svg">
        <StarManSvg />
      </div>
      <div className="connect_wallet_main">
        <div className="connect_wallet_logo">
          {" "}
          <img src={logo} alt="" />
        </div>
        <h3>
          Poultry<span>Hunter</span>
        </h3>
        <WalletMultiButton />
      </div>
    </div>
  );
}
