use crate::instruction::PoultryFarmInstructions;
use crate::state::{Affected, Batch, Distributor, Farm, HealthOfficer, Seller};
use borsh::{BorshDeserialize, BorshSerialize};

use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};

pub struct Processor;
impl Processor {
	pub fn init_farm(_program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let farm_account = next_account_info(accounts_iter)?;
		let farm_data = Farm::try_from_slice(&input)?;

		msg!("farm data from front-end {:?}", farm_data);

		farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;

		Ok(())
	}
	pub fn init_distributer(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let distributer_account = next_account_info(accounts_iter)?;
		let distributer_data = Distributor::try_from_slice(&input)?;

		msg!("distributer_data from front-end {:?}", distributer_data);

		distributer_data.serialize(&mut &mut distributer_account.data.borrow_mut()[..])?;
		
		Ok(())
	}
	pub fn init_seller(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let seller_account = next_account_info(accounts_iter)?;
		let seller_data = Seller::try_from_slice(&input)?;

		msg!("Seller Data from front-end {:?}", seller_data);

		seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;

		Ok(())
	}
	pub fn init_healthofficer(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let health_officer_account = next_account_info(accounts_iter)?;
		let health_officer_data = HealthOfficer::try_from_slice(&input)?;
		health_officer_data.serialize(&mut &mut health_officer_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn generate_new_batch(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let new_batch = Batch::try_from_slice(&input)?;
		new_batch.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn update_batch_distributor(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let _distributor_account = next_account_info(accounts_iter)?;
		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		batch_data.distributor_pubkey = String::from("distributor pubkey");
		Ok(())
	}
	pub fn update_batch_seller(_program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let _seller_account = next_account_info(accounts_iter)?;
		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		batch_data.seller_pubkey = String::from("seller pubkey");
		Ok(())
	}
	pub fn mark_affected_chain(
		_program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let instruction = Affected::try_from_slice(input)?;
		let accounts_iter = &mut accounts.iter();

		let batch_account = next_account_info(accounts_iter)?;
		let farm_account = next_account_info(accounts_iter)?;
		let distributor_account = next_account_info(accounts_iter)?;
		let seller_account = next_account_info(accounts_iter)?;

		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		let mut farm_data = Batch::try_from_slice(&farm_account.data.borrow())?;
		let mut distributor_data = Batch::try_from_slice(&distributor_account.data.borrow())?;
		let mut seller_data = Batch::try_from_slice(&seller_account.data.borrow())?;

		match instruction {
			Affected::Affected => {
				batch_data.affected = 1;
				batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
				farm_data.affected = 1;
				farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;
				distributor_data.affected = 1;
				distributor_data.serialize(&mut &mut distributor_account.data.borrow_mut()[..])?;
				seller_data.affected = 1;
				seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;
			}
			Affected::Unaffected => {
				batch_data.affected = 0;
				batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
				farm_data.affected = 0;
				farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;
				distributor_data.affected = 0;
				distributor_data.serialize(&mut &mut distributor_account.data.borrow_mut()[..])?;
				seller_data.affected = 0;
				seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;
			}
		}

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
			PoultryFarmInstructions::GenerateBatch { input } => {
				msg!("generating new batch");
				Processor::generate_new_batch(program_id, accounts, &input)?;
			}
			PoultryFarmInstructions::UpdateBatchDistributor => {
				Processor::update_batch_distributor(program_id, accounts)?;
			}
			PoultryFarmInstructions::UpdateBatchSeller => {
				Processor::update_batch_seller(program_id, accounts)?;
			}
			PoultryFarmInstructions::SetAffectedChain { input } => {
				msg!("Setting batch as affected");
				Processor::mark_affected_chain(program_id, accounts, &input)?;
			}
		}
		Ok(())
	}
}