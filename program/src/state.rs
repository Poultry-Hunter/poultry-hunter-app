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
	name: String,
}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct HealthProffessional {
	name: String,
}
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Batch {}
