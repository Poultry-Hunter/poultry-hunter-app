import { createSlice } from "@reduxjs/toolkit";
import { PublicKey } from "@solana/web3.js";

let initialState = {
  wallet: {
    connected: false,
    pubkey: PublicKey,
  },
  account: {
    pubkey: false,
    data: {},
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
