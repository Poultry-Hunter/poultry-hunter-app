import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { clusterApiUrl } from "@solana/web3.js";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";

import {
  getPhantomWallet,
  getSolflareWebWallet,
  getTorusWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";

import * as borsh from "borsh";
import { DistributorAccount, SCHEMA } from "../../schema";
import "./App.css";
import Home from "../Home/Home";

export const App = (): JSX.Element => {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWebWallet(),
      // getTorusWallet(),
      getSolletWallet(),
    ],
    []
  );
  const data = new DistributorAccount(
    "rhutik distributor",
    "rhutik",
    "moon",
    "9735552",
    0
  );
  const test = borsh.serialize(SCHEMA, data);
  const Buffers = Buffer.from(test);
  //@ts-ignore
  const t = borsh.deserialize(SCHEMA, DistributorAccount, Buffers);
  console.log(t);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </Router>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
