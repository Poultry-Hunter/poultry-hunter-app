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
import "./App.css";
import Home from "../Home/Home";
import GettingStarted from "../GettingStarted/GettingStarted";
import { FarmDashboard } from "../FarmDashboard";
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
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/getting-started" component={GettingStarted} />
                <Route path="/farm-dashboard" component={FarmDashboard} />
              </Switch>
            </Router>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
