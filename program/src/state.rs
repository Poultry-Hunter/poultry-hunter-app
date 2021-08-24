use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Farm {
	farm_name: String,
	owner_name: String,
	contact_number: u8,

}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Distributor {
	name: String,
}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Seller {
    shop_name: String,
    owner_name: String,
    shop_address: String,
    owner_contact: String,
}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct HealthOfficer {
    name: String,
    office_id: String,
    office_address: String,
    officer_contact: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Batch {
    batch_id: u32,
    farm_pubkey: String,
    distributor_pubkey: String,
    seller_pubkey: String,
    generated_at: String,
    sold_at: String,
}
