import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  BATCH_INPUT_LAYOUT,
  BATCH_LAYOUT,
  DistributorAccount,
  FarmAccount,
  HealthOfficerAccount,
  SCHEMA,
  SellerAccount,
} from "../schema";
import * as borsh from "borsh";
import { Numberu32 } from "../utils/utils";
import {
  DistributorAccountData,
  FarmAccountData,
  OfficerAccountData,
  SellerAccountData,
} from "../accounts/types";
export enum PoultryInstructions {
  InitialiseFarm = 0,
  InitialiseDistributer = 1,
  InitialiseSeller = 2,
  InitialiseHeathProfessional = 3,
  GenerateBatch = 4,
  SetAffectedChain = 5,
  UpdateBatchDistributor = 6,
  UpdateBatchSeller = 7,
  DeleteAndClaim = 8,
}

export async function CreateAccountAndInitialiseFarm(
  programId: PublicKey,
  wallet_pubkey: PublicKey,
  farmData: FarmAccountData,
  connection: Connection,
  sendTransaction: any
) {
  await connection.requestAirdrop(wallet_pubkey, LAMPORTS_PER_SOL);
  const farm_data = new FarmAccount(farmData);
  const input = borsh.serialize(SCHEMA, farm_data);
  const FARM_ACCOUNT_SIZE = input.length;
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.InitialiseFarm])),
    new Numberu32(input.length).toBuffer(),
    Buffer.from(input),
  ];
  const data = Buffer.concat(buffers);
  const farm_data_account = await PublicKey.createWithSeed(
    wallet_pubkey,
    "farmaccount",
    programId
  );
  const farm_account = await connection.getAccountInfo(farm_data_account);
  if (farm_account === null) {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      FARM_ACCOUNT_SIZE
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet_pubkey,
        basePubkey: wallet_pubkey,
        seed: "farmaccount",
        newAccountPubkey: farm_data_account,
        lamports,
        space: FARM_ACCOUNT_SIZE,
        programId,
      })
    );
    await sendTransaction(transaction, connection);
    const instruction = new TransactionInstruction({
      keys: [{ pubkey: farm_data_account, isSigner: false, isWritable: true }],
      programId,
      data: data,
    });
    await sendTransaction(new Transaction().add(instruction), connection);
  }
}

export async function CreateAccountAndInitialiseDistributor(
  programId: PublicKey,
  wallet_pubkey: PublicKey,
  distributorData: DistributorAccountData,
  connection: Connection,
  sendTransaction: any
) {
  const distributor_data = new DistributorAccount(distributorData);
  const input = borsh.serialize(SCHEMA, distributor_data);
  const DISTRIBUTOR_ACCOUNT_SIZE = input.length;
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.InitialiseDistributer])),
    new Numberu32(input.length).toBuffer(),
    Buffer.from(input),
  ];
  const data = Buffer.concat(buffers);
  const distributor_data_account = await PublicKey.createWithSeed(
    wallet_pubkey,
    "distributoraccount",
    programId
  );
  const distributor_account = await connection.getAccountInfo(
    distributor_data_account
  );
  if (distributor_account === null) {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      DISTRIBUTOR_ACCOUNT_SIZE
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet_pubkey,
        basePubkey: wallet_pubkey,
        seed: "distributoraccount",
        newAccountPubkey: distributor_data_account,
        lamports,
        space: DISTRIBUTOR_ACCOUNT_SIZE,
        programId,
      })
    );
    await sendTransaction(transaction, connection);
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: distributor_data_account, isSigner: false, isWritable: true },
      ],
      programId,
      data: data,
    });
    await sendTransaction(new Transaction().add(instruction), connection);
  }
}

export async function CreateAccountAndInitialiseSeller(
  programId: PublicKey,
  wallet_pubkey: PublicKey,
  sellerData: SellerAccountData,
  connection: Connection,
  sendTransaction: any
) {
  const seller_data = new SellerAccount(sellerData);
  const input = borsh.serialize(SCHEMA, seller_data);
  const SELLER_ACCOUNT_SIZE = input.length;
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.InitialiseSeller])),
    new Numberu32(input.length).toBuffer(),
    Buffer.from(input),
  ];
  const data = Buffer.concat(buffers);
  const seller_data_account = await PublicKey.createWithSeed(
    wallet_pubkey,
    "selleraccount",
    programId
  );
  const seller_account = await connection.getAccountInfo(seller_data_account);
  if (seller_account === null) {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      SELLER_ACCOUNT_SIZE
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet_pubkey,
        basePubkey: wallet_pubkey,
        seed: "selleraccount",
        newAccountPubkey: seller_data_account,
        lamports,
        space: SELLER_ACCOUNT_SIZE,
        programId,
      })
    );
    await sendTransaction(transaction, connection);
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: seller_data_account, isSigner: false, isWritable: true },
      ],
      programId,
      data: data,
    });
    await sendTransaction(new Transaction().add(instruction), connection);
  }
}
export async function CreateAccountAndInitialiseOfficer(
  programId: PublicKey,
  wallet_pubkey: PublicKey,
  officerData: OfficerAccountData,
  connection: Connection,
  sendTransaction: any
) {
  const officer_data = new HealthOfficerAccount(officerData);
  const input = borsh.serialize(SCHEMA, officer_data);
  const OFFICER_ACCOUNT_SIZE = input.length;
  const buffers = [
    Buffer.from(
      Int8Array.from([PoultryInstructions.InitialiseHeathProfessional])
    ),
    new Numberu32(input.length).toBuffer(),
    Buffer.from(input),
  ];
  const data = Buffer.concat(buffers);
  const officer_data_account = await PublicKey.createWithSeed(
    wallet_pubkey,
    "officeraccount",
    programId
  );
  const officer_account = await connection.getAccountInfo(officer_data_account);
  if (officer_account === null) {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      OFFICER_ACCOUNT_SIZE
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet_pubkey,
        basePubkey: wallet_pubkey,
        seed: "officeraccount",
        newAccountPubkey: officer_data_account,
        lamports,
        space: OFFICER_ACCOUNT_SIZE,
        programId,
      })
    );
    await sendTransaction(transaction, connection);
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: officer_data_account, isSigner: false, isWritable: true },
      ],
      programId,
      data: data,
    });
    await sendTransaction(new Transaction().add(instruction), connection);
  }
}

export async function CreateAccountAndGenerateBatch(
  programId: PublicKey,
  wallet_pubkey: PublicKey,
  farm_data_account_Pubkey: PublicKey,
  batchData: { batch_id: number; batch_size: number; timestamp: number },
  connection: Connection,
  sendTransaction: any
) {
  const new_batch_data = BATCH_INPUT_LAYOUT.encode(batchData);
  const BATCH_ACCOUNT_SIZE = BATCH_LAYOUT.span;
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.GenerateBatch])),
    new Numberu32(BATCH_INPUT_LAYOUT.span).toBuffer(),
    Buffer.from(new_batch_data),
  ];
  const data = Buffer.concat(buffers);

  const batch_data_account = await PublicKey.createWithSeed(
    farm_data_account_Pubkey,
    batchData.batch_id.toString(),
    programId
  );
  const Batch_account = await connection.getAccountInfo(batch_data_account);
  if (Batch_account === null) {
    const lamports = await connection.getMinimumBalanceForRentExemption(
      BATCH_ACCOUNT_SIZE
    );
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet_pubkey,
        basePubkey: farm_data_account_Pubkey,
        seed: batchData.batch_id.toString(),
        newAccountPubkey: batch_data_account,
        lamports,
        space: BATCH_ACCOUNT_SIZE,
        programId,
      })
    );
    await sendTransaction(transaction, connection);
    const instruction = new TransactionInstruction({
      keys: [
        { pubkey: batch_data_account, isSigner: false, isWritable: true },
        { pubkey: farm_data_account_Pubkey, isSigner: false, isWritable: true },
      ],
      programId,
      data: data,
    });
    await sendTransaction(new Transaction().add(instruction), connection);
  }
}
export async function UpdateBatchDistributor(
  programId: PublicKey,
  batch_account_pubkey: PublicKey,
  distributor_account_pubkey: PublicKey,
  connection: Connection,
  sendTransaction: any
) {
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.UpdateBatchDistributor])),
  ];
  const data = Buffer.concat(buffers);
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: batch_account_pubkey, isSigner: false, isWritable: true },
      { pubkey: distributor_account_pubkey, isSigner: false, isWritable: true },
    ],
    programId,
    data: data,
  });
  await sendTransaction(new Transaction().add(instruction), connection);
}
export async function UpdateBatchSeller(
  programId: PublicKey,
  batch_account_pubkey: PublicKey,
  Seller_account_pubkey: PublicKey,
  connection: Connection,
  sendTransaction: any
) {
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.UpdateBatchSeller])),
  ];
  const data = Buffer.concat(buffers);
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: batch_account_pubkey, isSigner: false, isWritable: true },
      { pubkey: Seller_account_pubkey, isSigner: false, isWritable: true },
    ],
    programId,
    data: data,
  });
  await sendTransaction(new Transaction().add(instruction), connection);
}
export async function SetAffectedChain(
  programId: PublicKey,
  AffectedStatus: 0 | 1,
  batch_pubkey: PublicKey,
  farm_pubkey: PublicKey,
  distributor_pubkey: PublicKey,
  seller_pubkey: PublicKey,
  officer_account_pubkey: PublicKey,
  connection: Connection,
  sendTransaction: any
) {
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.SetAffectedChain])),
    Buffer.from(Int8Array.from([AffectedStatus])),
  ];
  const data = Buffer.concat(buffers);
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: officer_account_pubkey, isSigner: false, isWritable: true },
      { pubkey: batch_pubkey, isSigner: false, isWritable: true },
      { pubkey: farm_pubkey, isSigner: false, isWritable: true },
      { pubkey: distributor_pubkey, isSigner: false, isWritable: true },
      { pubkey: seller_pubkey, isSigner: false, isWritable: true },
    ],
    programId,
    data: data,
  });
  await sendTransaction(new Transaction().add(instruction), connection);
}
export async function DeleteBatchAndRefund(
  programId: PublicKey,
  wallet_pubKey: PublicKey,
  batch_pubkey: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection,
  sendTransaction: any
) {
  const buffers = [
    Buffer.from(Int8Array.from([PoultryInstructions.DeleteAndClaim])),
  ];
  const data = Buffer.concat(buffers);
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: batch_pubkey, isSigner: false, isWritable: true },
      { pubkey: farm_pubkey, isSigner: false, isWritable: true },
      { pubkey: wallet_pubKey, isSigner: false, isWritable: true }, //refund account
    ],
    programId,
    data: data,
  });
  await sendTransaction(new Transaction().add(instruction), connection);
}
