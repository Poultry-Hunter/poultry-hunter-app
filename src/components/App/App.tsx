import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { clusterApiUrl } from "@solana/web3.js";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { ArcGisMap } from "../mapbox";

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
import DistributorsDashboard from "../DistributorsDashboard/DistributorsDashboard";
import SellersDashboard from "../SellersDashboard/SellersDashboard";
import { OfficerDashboard } from "../OfficerDashboard/Dashboard";
import GettingStartedDesktop from "../GettingStartedDesktop/GettingStartedDesktop";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
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
      <ConnectionProvider endpoint="http://127.0.0.1:8899">
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/getting-started/:userType"
                  component={GettingStarted}
                />
                <Route
                  path="/getting-started-desktop/:userType"
                  component={GettingStartedDesktop}
                />
                <Route path="/connect-Wallet" component={ConnectWallet} />

                <Route path="/farm-dashboard" component={FarmDashboard} />
                <Route
                  path="/distributors-dashboard"
                  component={DistributorsDashboard}
                />
                <Route path="/sellers-dashboard" component={SellersDashboard} />
                <Route path="/officer-dashboard" component={OfficerDashboard} />
                <Route path="/ArcGisMap" component={ArcGisMap} />
              </Switch>
            </Router>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
