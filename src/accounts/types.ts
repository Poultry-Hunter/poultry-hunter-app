import { PublicKey } from "@solana/web3.js";
import BN from "bn.js"
export type FarmAccountData = {
  farm_name: string;
  owner_name: string;
  contact_number: string;
  farm_address: string;
  refund_account: Uint8Array;
  infected: number;
};
export type DistributorAccountData = {
  distribution_center: string;
  distributor_name: string;
  center_address: string;
  contact_number: string;
  infected: number;
};
export type SellerAccountData = {
  shop_name: string;
  owner_name: string;
  shop_address: string;
  contact_number: string;
  infected: number;
};
export type OfficerAccountData = {
  officer_name: string;
  office_id: string;
  office_address: string;
  officer_contact: string;
};
export type BatchAcountData = {
  batch_id: number;
  farm_pubkey: Uint8Array;
  distributor_pubkey: Uint8Array;
  seller_pubkey: Uint8Array;
  infected: number;
  batch_size: number;
  generated_at: BN;
  marked_by: Uint8Array;
};
