import {
  Connection,
  GetProgramAccountsFilter,
  PublicKey,
} from "@solana/web3.js";
import {
  BATCH_LAYOUT,
  DistributorAccount,
  FarmAccount,
  HealthOfficerAccount,
  SCHEMA,
  SellerAccount,
} from "../schema";
import * as borsh from "borsh";
export async function GetBatchAccounts(
  programId: PublicKey,
  filter_pubkey: PublicKey,
  connection: Connection,
  offset: string
) {
  const account = await connection.getAccountInfo(filter_pubkey);
  if (account === null) {
    return false;
  } else {
    const BatchAccounts = await connection.getProgramAccounts(programId, {
      filters: [
        {
          memcmp: {
            offset: BATCH_LAYOUT.offsetOf(offset), //"farm_pubkey","distributor_pubkey"
            bytes: filter_pubkey.toBase58(),
          },
        },
        {
          dataSize: BATCH_LAYOUT.span,
        },
      ],
    });
    const accounts_data = BatchAccounts.map((account_info) => {
      let batch_data = BATCH_LAYOUT.decode(account_info.account.data);
      batch_data.farm_pubkey = new PublicKey(batch_data.farm_pubkey).toString();
      batch_data.distributor_pubkey = new PublicKey(
        batch_data.distributor_pubkey
      ).toString();
      batch_data.seller_pubkey = new PublicKey(
        batch_data.seller_pubkey
      ).toString();
      batch_data.marked_by = new PublicKey(batch_data.marked_by).toString();
      return batch_data;
    });
    return accounts_data;
  }
}

export async function GetFarmerData(
  programId: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection
) {
  const account_info = await connection.getAccountInfo(farm_pubkey);
  if (account_info === null) {
    return false;
  } else {
    const farm_data = borsh.deserialize(SCHEMA, FarmAccount, account_info.data);
    return farm_data;
  }
}
export async function GetSellerData(
  programId: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection
) {
  const account_info = await connection.getAccountInfo(farm_pubkey);
  if (account_info === null) {
    return false;
  } else {
    const seller_data = borsh.deserialize(
      SCHEMA,
      SellerAccount,
      account_info.data
    );
    return seller_data;
  }
}

export async function GetDistributorData(
  programId: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection
) {
  const account_info = await connection.getAccountInfo(farm_pubkey);
  if (account_info === null) {
    return false;
  } else {
    const distributor_data = borsh.deserialize(
      SCHEMA,
      DistributorAccount,
      account_info.data
    );
    return distributor_data;
  }
}

export async function GetOfficerData(
  programId: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection
) {
  const account_info = await connection.getAccountInfo(farm_pubkey);
  if (account_info === null) {
    return false;
  } else {
    const officer_data = borsh.deserialize(
      SCHEMA,
      HealthOfficerAccount,
      account_info.data
    );
    return officer_data;
  }
}

export async function GetAffectedFarms(
  programId: PublicKey,
  farm_pubkey: PublicKey,
  connection: Connection
) {
  const AffectedFarm = await connection.getProgramAccounts(programId, {
    filters: [
      {
        memcmp: {
          offset: BATCH_LAYOUT.offsetOf("infected"), //"farm_pubkey","distributor_pubkey"
          bytes: "1",
        },
      },
      {
        dataSize: BATCH_LAYOUT.span,
      },
    ],
  });
}
