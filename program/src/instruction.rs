use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum PoultryFarmInstructions {
	InitialiseFarm { input: Vec<u8> },
	InitialiseDistributer { input: Vec<u8> },
	InitialiseSeller { input: Vec<u8> },
	InitialiseHeathProfessional { input: Vec<u8> },
	GenerateBatch { input: Vec<u8> },
	SetAffectedChain { input: [u8; 1] },
	UpdateBatchDistributor,
	UpdateBatchSeller,
	DeleteAndClaim,
}
