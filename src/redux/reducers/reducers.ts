import { createSlice } from "@reduxjs/toolkit";
import { PublicKey } from "@solana/web3.js";
import { FarmAccount } from "../../schema";
type stateType = {
  wallet: { connected: boolean; pubkey: PublicKey };
  account: {
    pubkey: boolean;
    data: FarmAccount | undefined;
  };
  batches: {
    data: [];
  };
};
let initialState: stateType = {
  wallet: {
    connected: false,
    pubkey: PublicKey.default,
  },
  account: {
    pubkey: false,
    data: undefined,
  },
  batches: {
    data: [],
  },
};

const poultrySlice = createSlice({
  name: "poultryhunter",
  initialState,
  reducers: {
    setWallet: (state, { payload }) => {
      state.wallet.connected = payload.connected;
      state.wallet.pubkey = payload.pubkey;
    },
    setAccountPubkey: (state, { payload }) => {
      state.account.pubkey = payload;
    },
    setAccountData: (state, { payload }) => {
      state.account.data = payload;
    },
    setBatches: (state, { payload }) => {
      state.batches.data = payload;
    },
  },
  extraReducers: {},
});

export const { setWallet, setAccountData, setBatches, setAccountPubkey } =
  poultrySlice.actions;
export default poultrySlice.reducer;
