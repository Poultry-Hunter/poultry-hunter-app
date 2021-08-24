use crate::instruction::PoultryFarmInstructions;
use crate::state::{Batch, Distributor, Farm, HealthProffessional, Seller};
use borsh::{BorshDeserialize, BorshSerialize};

use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint,
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};

pub struct Processor;
impl Processor {
	pub fn initfarm(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let farm_account = next_account_info(accounts_iter)?;
		let mut farm_data = Farm::try_from_slice(&input);
		msg!("farm data from front-end {:?}", farm_data);
		Ok(())
	}
	pub fn initdistributer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let distributer_account = next_account_info(accounts_iter)?;
		let mut distributer_data = Distributor::try_from_slice(&input)?;
		msg!("distributer_data from front-end {:?}", distributer_data);
		Ok(())
	}
	pub fn initseller(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let seller_account = next_account_info(accounts_iter)?;
		let mut seller_data = Seller::try_from_slice(&input)?;
		msg!("Seller Data from front-end {:?}", seller_data);
		Ok(())
	}
	pub fn inithealthproffessional(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let healthprof_account = next_account_info(accounts_iter)?;
		let mut healthprof_data = HealthProffessional::try_from_slice(&input)?;
		msg!(
			"health proffessional Data from front-end {:?}",
			healthprof_data
		);
		Ok(())
	}
	pub fn generatenewbatch(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		batch_id: u8,
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		msg!("Batch id Data from front-end {:?}", batch_id);
		Ok(())
	}
	pub fn setaffectedchain(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		// let seller_account = next_account_info(accounts_iter)?;
		// let distributer_account = next_account_info(accounts_iter)?;
		// let farm_account = next_account_info(accounts_iter)?;
		Ok(())
	}
	pub fn process_instruction(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		instruction_data: &[u8],
	) -> ProgramResult {
		let instructions = PoultryFarmInstructions::try_from_slice(instruction_data)
			.map_err(|_| ProgramError::InvalidInstructionData)?;
		match instructions {
			PoultryFarmInstructions::InitialiseFarm { input } => {
				msg!("Initialising farm data");
				Processor::initfarm(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseDistributer { input } => {
				msg!("Initialising dsitributor data");
				Processor::initdistributer(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseSeller { input } => {
				msg!("Initialising seller data");

				Processor::initseller(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseHeathProfessional { input } => {
				msg!("Initialising health peoffessionals data");
				Processor::inithealthproffessional(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::GanerateBatch { batch_id } => {
				msg!("generating new batch");

				Processor::generatenewbatch(program_id, accounts, batch_id)?;
			}
			PoultryFarmInstructions::SetAffectedChain => {
				msg!("Setting batch as affected");
				Processor::setaffectedchain(program_id, accounts)?;
			}
		}
		Ok(())
	}
}
