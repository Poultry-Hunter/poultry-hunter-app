import { Connection, PublicKey } from "@solana/web3.js";

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
    return Pubkey;
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
