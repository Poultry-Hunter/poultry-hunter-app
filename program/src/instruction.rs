use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum PoultryFarmInstructions {
	InitialiseFarm { input: Vec<u8> },
	InitialiseDistributer { input: Vec<u8> },
	InitialiseSeller { input: Vec<u8> },
	InitialiseHeathProfessional { input: Vec<u8> },
	GanerateBatch { batch_id: u8 },
	SetAffectedChain,
}