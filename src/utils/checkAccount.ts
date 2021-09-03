import { Connection, PublicKey } from "@solana/web3.js";
import * as borsh from "borsh";
import {
  BATCH_LAYOUT,
  DistributorAccount,
  FarmAccount,
  HealthOfficerAccount,
  SCHEMA,
  SellerAccount,
} from "../schema";

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
    const farm_data = borsh.deserialize(SCHEMA, FarmAccount, account_info.data);
    return farm_data;
  }
}
export async function checkOfficerAcount(
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
    return Pubkey;
  }
}
