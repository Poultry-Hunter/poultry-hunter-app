use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Farm {
    name: String,
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