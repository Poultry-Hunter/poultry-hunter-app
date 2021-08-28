import {
    PublicKey,
} from "@solana/web3.js";
import BufferLayout from "buffer-layout"
export class FarmAccount {
    farm_name: string;
    owner_name: string;
    contact_number: string;
    farm_address: string;
    refund_account: any;
    infected: Number
    constructor(farm_name: string, owner_name: string, contact_number: string, farm_address: string, infected: number, refund_account: PublicKey) {
        this.farm_name = farm_name;
        this.owner_name = owner_name;
        this.contact_number = contact_number;
        this.farm_address = farm_address;
        this.refund_account = refund_account.toBuffer()
        this.infected = infected
    }
}
export class DistributorAccount {
    distribution_center: string;
    distributor_name: string;
    center_address: string;
    contact_number: string;
    infected: Number
    constructor(distribution_center: string, distributor_name: string, center_address: string, contact_number: string, infected: number) {
        this.distribution_center = distribution_center;
        this.distributor_name = distributor_name;
        this.center_address = center_address;
        this.contact_number = contact_number;
        this.infected = infected
    }
}
export class SellerAccount {
    shop_name: string;
    owner_name: string;
    shop_address: string;
    contact_number: string;
    infected: Number
    constructor(shop_name: string, owner_name: string, contact_number: string, farm_address: string, infected: number) {
        this.shop_name = shop_name;
        this.owner_name = owner_name;
        this.shop_address = farm_address;
        this.contact_number = contact_number;
        this.infected = infected
    }
}

export class HealthOfficerAccount {
    officer_name: string;
    office_id: string;
    office_address: string;
    officer_contact: string;
    constructor(officer_name: string, office_id: string, office_address: string, officer_contact: string) {
        this.officer_name = officer_name;
        this.office_id = office_id;
        this.office_address = office_address;
        this.officer_contact = officer_contact;
    }
}
export const SCHEMA = new Map<any, any>([
    [FarmAccount, {
        kind: "struct",
        fields: [
            ["farm_name", "String"],
            ["owner_name", "String"],
            ["contact_number", "String"],
            ["farm_address", "String"],
            ["refund_account", [32]],
            ["infected", "u32"],
        ],
    }],
    [DistributorAccount, {
        kind: "struct",
        fields: [
            ["distribution_center", "String"],
            ["distributor_name", "String"],
            ["center_address", "String"],
            ["contact_number", "String"],
            ["infected", "u32"],
        ],
    }],
    [SellerAccount, {
        kind: "struct",
        fields: [
            ["shop_name", "String"],
            ["owner_name", "String"],
            ["shop_address", "String"],
            ["contact_number", "String"],
            ["infected", "u32"],
        ],
    }],
    [HealthOfficerAccount, {
        kind: "struct",
        fields: [
            ["officer_name", "String"],
            ["office_id", "String"],
            ["office_address", "String"],
            ["officer_contact", "String"],
        ],
    }]
])



export const BATCH_LAYOUT = BufferLayout.struct([
    BufferLayout.u32("batch_id"),
    BufferLayout.blob(32, "farm_pubkey"),
    BufferLayout.blob(32, "distributor_pubkey"),
    BufferLayout.blob(32, "seller_pubkey"),
    BufferLayout.u32("infected"),
    BufferLayout.nu64("generated_at"),
    BufferLayout.u32("batch_size"),
    BufferLayout.blob(32, "marked_by"),
]);