use crate::instruction::PoultryFarmInstructions;
use crate::state::{Batch, Distributor, Farm, HealthOfficer, Seller};
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
	pub fn init_farm(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let farm_account = next_account_info(accounts_iter)?;
		let mut farm_data = Farm::try_from_slice(&input);
		msg!("farm data from front-end {:?}", farm_data);
		Ok(())
	}
	pub fn init_distributer(
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
	pub fn init_seller(
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
	pub fn init_healthofficer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let health_officer_account = next_account_info(accounts_iter)?;
		let mut health_officer_data = HealthOfficer::try_from_slice(&input)?;
		msg!(
			"HealthOfficer Data from front-end {:?}",
			health_officer_data
		);
		Ok(())
	}
	pub fn generate_new_batch(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		batch_id: u8,
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		msg!("Batch id Data from front-end {:?}", batch_id);
		Ok(())
	}
	pub fn mark_affected_chain(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
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
				Processor::init_farm(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseDistributer { input } => {
				msg!("Initialising dsitributor data");
				Processor::init_distributer(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseSeller { input } => {
				msg!("Initialising seller data");

				Processor::init_seller(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::InitialiseHeathProfessional { input } => {
				msg!("Initialising health peoffessionals data");
				Processor::init_healthofficer(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::GenerateBatch { batch_id } => {
				msg!("generating new batch");

				Processor::generate_new_batch(program_id, accounts, batch_id)?;
			}
			PoultryFarmInstructions::SetAffectedChain => {
				msg!("Setting batch as affected");
				Processor::mark_affected_chain(program_id, accounts)?;
			}
		}
		Ok(())
	}
}
