import React, { useEffect } from "react";
import "./connectWallet.css";
import { ReactComponent as StarManSvg } from "../../assets/images/vector-art/starman.svg";
import logo from "../../assets/images/logo/logo.svg";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useHistory } from "react-router";
import { CreateAccountAndInitialiseFarm } from "../../instructions";
import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

export default function ConnectWallet() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  // useEffect(() => {
  //   if (connected) {
  //     if (publicKey) {
  //       CreateAccountAndInitialiseFarm(
  //         new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
  //         publicKey,
  //         {
  //           farm_name: "rhutik Farm",
  //           owner_name: "rhutiik",
  //           farm_address: "mpoood",
  //           infected: 0,
  //           refund_account: publicKey,
  //           contact_number: "234343",
  //         },
  //         connection,
  //         sendTransaction
  //       ).then(() => console.log("Data_sent"));
  //     }
  //   }
  // }, [connected]);
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
