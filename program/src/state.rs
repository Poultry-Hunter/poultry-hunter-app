use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Farm {
    name: String,
}
pub struct Distributor {
    name: String,
}
pub struct Seller {
    name: String,
}
pub struct HealthProffessional {
    name: String,
}
pub struct Batch {}
