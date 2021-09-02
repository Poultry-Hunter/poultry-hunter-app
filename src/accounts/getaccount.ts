import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
export async function CheckFarmAccount(
  programId: PublicKey,
  wallet: PublicKey,
  connection: Connection,
  sendTransaction?: any
) {
  await connection.requestAirdrop(wallet, LAMPORTS_PER_SOL);

  const FarmPubkey = await PublicKey.createWithSeed(
    wallet,
    "farmaccount",
    programId
  );
  //   const lamports = await connection.getMinimumBalanceForRentExemption(10);
  //   const transaction = new Transaction().add(
  //     SystemProgram.createAccountWithSeed({
  //       fromPubkey: wallet,
  //       basePubkey: wallet,
  //       seed: "farmaccount",
  //       newAccountPubkey: FarmPubkey,
  //       lamports,
  //       space: 10,
  //       programId,
  //     })
  //   );
  //   await sendTransaction(transaction, connection);
  const account = await connection.getAccountInfo(FarmPubkey);
  if (account === null) {
    return false;
  } else {
    return true;
  }
}
