import { Connection, PublicKey } from "@solana/web3.js";
import * as borsh from "borsh";
import { FarmAccountData } from "../accounts/types";
import {
  BATCH_LAYOUT,
  DistributorAccount,
  FarmAccount,
  HealthOfficerAccount,
  SCHEMA,
  SellerAccount,
} from "../schema";
import { GetBatchAccounts, GetFarmerData } from "./filters";

export async function checkFarmAcount(
  programId: PublicKey,
  wallet: PublicKey,
  connection: Connection
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "farmaccount",
    programId
  );
  const account_info = await connection.getAccountInfo(Pubkey);
  if (account_info === null) {
    return false;
  } else {
    if (wallet) {
      const batches = await GetBatchAccounts(
        programId,
        wallet,
        connection,
        "farm_pubkey"
      );
      const farm_data = borsh.deserialize(
        SCHEMA,
        FarmAccount,
        account_info.data
      );
      const data = {
        farm_data: farm_data,
        farm_account_pubkey: Pubkey.toString(),
        farm_batches: batches,
      };
      return data;
    }
  }
}

export async function checkOfficerAccount(
  programId: PublicKey,
  wallet: PublicKey,
  connection: Connection
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "officeraccount",
    programId
  );
  const account_info = await connection.getAccountInfo(Pubkey);
  if (account_info === null) {
    return false;
  } else {
    if (wallet) {
      const batches = await GetBatchAccounts(
        programId,
        wallet,
        connection,
        "marked_by"
      );
      const officer_data = borsh.deserialize(
        SCHEMA,
        HealthOfficerAccount,
        account_info.data
      );
      const data = {
        officer_data: officer_data,
        officer_account_pubkey: Pubkey,
        marked_batches: batches,
      };
      return data;
    }
  }
}

export async function checkDistributorsAccount(
  programId: PublicKey,
  wallet: PublicKey,
  connection: Connection
) {
  const PubKey = await PublicKey.createWithSeed(
    wallet,
    "distributoraccount",
    programId
  );

  const accountInfo = await connection.getAccountInfo(PubKey);
  console.log(accountInfo)

  if (accountInfo) {
    if (PubKey) {
      const batches = await GetBatchAccounts(
        programId,
        PubKey,
        connection,
        "distributor_pubkey"
      );
      const distributor_data = borsh.deserialize(
        SCHEMA,
        DistributorAccount,
        accountInfo.data
      );
      const data = {
        data: distributor_data,
        distributorAccountPubkey: PubKey,
        distributor_batches: batches,
      };
      return data;
    }
  }
  return false;
}

export async function checkSellerAccount(
  programId: PublicKey,
  wallet: PublicKey,
  connection: Connection
) {
  const PubKey = await PublicKey.createWithSeed(
    wallet,
    "selleraccount",
    programId
  );

  const accountInfo = await connection.getAccountInfo(PubKey);

  if (accountInfo) {
    if (PubKey) {
      const batches = await GetBatchAccounts(
        programId,
        PubKey,
        connection,
        "seller_pubkey"
      );
      const seller_data = borsh.deserialize(
        SCHEMA,
        SellerAccount,
        accountInfo.data
      );
      const data = {
        data: seller_data,
        sellerAccountPubkey: PubKey,
        seller_batches: batches,
      };
      return data;
    }
  }
  return false;
}
