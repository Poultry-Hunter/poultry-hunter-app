import React from "react";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";

import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

const Home = () => {
  const { connection } = useConnection();
  const { connected, publicKey } = useWallet();

  const click = () => {
    console.log(connection);
    console.log(`Public Key ${publicKey?.toBase58()}`);
    console.log(`Connected ${connected}`);
  };

  return (
    <div>
      <WalletMultiButton color="primary" />
      <button onClick={click}>Log wallet details</button>
    </div>
  );
};

export default Home;
