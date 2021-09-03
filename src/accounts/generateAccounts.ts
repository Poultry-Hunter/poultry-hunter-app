import { PublicKey } from "@solana/web3.js";

export async function GenerateFarmAccountPubkey(
  programId: PublicKey,
  wallet: PublicKey
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "farmaccount",
    programId
  );
  return Pubkey;
}

export async function GenerateDsitributorAccountPubkey(
  programId: PublicKey,
  wallet: PublicKey
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "distributoraccount",
    programId
  );
  return Pubkey;
}
export async function GenerateSellerAccountPubkey(
  programId: PublicKey,
  wallet: PublicKey
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "selleraccount",
    programId
  );
  return Pubkey;
}
export async function GenerateOfficerAccountPubkey(
  programId: PublicKey,
  wallet: PublicKey
) {
  const Pubkey = await PublicKey.createWithSeed(
    wallet,
    "officeraccount",
    programId
  );
  return Pubkey;
}
