import { PublicKey } from "@solana/web3.js";
export type FarmAccountData = {
  farm_name: string;
  owner_name: string;
  contact_number: string;
  farm_address: string;
  refund_account: PublicKey;
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
