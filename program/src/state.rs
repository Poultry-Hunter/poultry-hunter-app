use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{account_info::AccountInfo, pubkey::Pubkey};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Farm {
	farm_name: String,
	owner_name: String,
	contact_number: String,
	farm_address: String,
	pub refund_account: Pubkey,
	pub infected: u8,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Distributor {
	name: String,
	contact_address: String,
	contact_number: String,
	pub infected: u8,
}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Seller {
	shop_name: String,
	owner_name: String,
	shop_address: String,
	owner_contact: String,
	pub infected: u8,
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
	pub batch_id: u32,
	pub farm_pubkey: Pubkey,
	pub distributor_pubkey: Pubkey,
	pub seller_pubkey: Pubkey,
	pub infected: u32,
	pub generated_at: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct BatchInput {
	pub batch_id: u32,
	pub timpestamp: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum AffectedStatus {
	SetAffected,
	SetUnaffected,
}

pub fn write_data(account: &AccountInfo, input: &[u8], offset: usize) {
	let mut account_data = account.data.borrow_mut();
	account_data[offset..offset + input.len()].copy_from_slice(input);
}
