use crate::instruction::PoultryFarmInstructions;
use crate::state::{
	write_data, AffectedStatus, Batch, BatchInput, Distributor, Farm, HealthOfficer, Seller,
};
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
	pub fn init_farm(program_id: &Pubkey, accounts: &[AccountInfo], input: &[u8]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let farm_account = next_account_info(accounts_iter)?;

		if farm_account.owner != program_id {
			msg!("Farm account does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let farm_data = Farm::try_from_slice(&input)?;
		msg!("farm data from front-end {:?}", farm_data);

		farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;

		Ok(())
	}
	pub fn init_distributer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let distributer_account = next_account_info(accounts_iter)?;

		if distributer_account.owner != program_id {
			msg!("Distributor account does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let distributer_data = Distributor::try_from_slice(&input)?;

		msg!("distributer_data from front-end {:?}", distributer_data);

		distributer_data.serialize(&mut &mut distributer_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn init_seller(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let seller_account = next_account_info(accounts_iter)?;

		if seller_account.owner != program_id {
			msg!("Seller account does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let seller_data = Seller::try_from_slice(&input)?;

		msg!("Seller Data from front-end {:?}", seller_data);

		seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;

		Ok(())
	}
	pub fn init_healthofficer(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let health_officer_account = next_account_info(accounts_iter)?;

		if health_officer_account.owner != program_id {
			msg!("Health officer account does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let health_officer_data = HealthOfficer::try_from_slice(&input)?;
		health_officer_data.serialize(&mut &mut health_officer_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn generate_new_batch(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let farm_account = next_account_info(accounts_iter)?;
		let batch_input = BatchInput::try_from_slice(input)?;

		if batch_account.owner != program_id && farm_account.owner != program_id {
			msg!("Accounts does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}
		let new_batch = Batch {
			batch_id: batch_input.batch_id,
			farm_pubkey: *farm_account.key,
			distributor_pubkey: Pubkey::default(),
			seller_pubkey: Pubkey::default(),
			infected: 0,
			generated_at: batch_input.timpestamp,
			batch_size: batch_input.batch_size,
		};

		new_batch.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn update_batch_distributor(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
	) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let distributor_account = next_account_info(accounts_iter)?;

		if batch_account.owner != program_id && distributor_account.owner != program_id {
			msg!("accounts does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		batch_data.distributor_pubkey = *distributor_account.key;
		batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
		Ok(())
	}
	pub fn update_batch_seller(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();
		let batch_account = next_account_info(accounts_iter)?;
		let seller_account = next_account_info(accounts_iter)?;

		if batch_account.owner != program_id && seller_account.owner != program_id {
			msg!("accounts does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		batch_data.seller_pubkey = *seller_account.key;
		batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;

		Ok(())
	}
	pub fn mark_affected_chain(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		input: &[u8],
	) -> ProgramResult {
		let instruction = AffectedStatus::try_from_slice(input)?;
		let accounts_iter = &mut accounts.iter();

		let batch_account = next_account_info(accounts_iter)?;
		let farm_account = next_account_info(accounts_iter)?;
		let distributor_account = next_account_info(accounts_iter)?;
		let seller_account = next_account_info(accounts_iter)?;

		if batch_account.owner != program_id
			&& farm_account.owner != program_id
			&& distributor_account.owner != program_id
			&& seller_account.owner != program_id
		{
			msg!("accounts does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}

		let mut batch_data = Batch::try_from_slice(&batch_account.data.borrow())?;
		let mut farm_data = Farm::try_from_slice(&farm_account.data.borrow())?;
		let mut distributor_data = Distributor::try_from_slice(&distributor_account.data.borrow())?;
		let mut seller_data = Seller::try_from_slice(&seller_account.data.borrow())?;

		match instruction {
			AffectedStatus::SetAffected => {
				batch_data.infected = 1;
				batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
				farm_data.infected = 1;
				farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;
				distributor_data.infected = 1;
				distributor_data.serialize(&mut &mut distributor_account.data.borrow_mut()[..])?;
				seller_data.infected = 1;
				seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;
			}
			AffectedStatus::SetUnaffected => {
				batch_data.infected = 0;
				batch_data.serialize(&mut &mut batch_account.data.borrow_mut()[..])?;
				farm_data.infected = 0;
				farm_data.serialize(&mut &mut farm_account.data.borrow_mut()[..])?;
				distributor_data.infected = 0;
				distributor_data.serialize(&mut &mut distributor_account.data.borrow_mut()[..])?;
				seller_data.infected = 0;
				seller_data.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;
			}
		}
		Ok(())
	}
	pub fn delete_and_claim(program_id: &Pubkey, accounts: &[AccountInfo]) -> ProgramResult {
		let accounts_iter = &mut accounts.iter();

		let batch_account = next_account_info(accounts_iter)?;
		let farm_account = next_account_info(accounts_iter)?;
		let refund_account = next_account_info(accounts_iter)?;

		if batch_account.owner != program_id && farm_account.owner != program_id {
			msg!("accounts does not have the correct program id");
			return Err(ProgramError::IncorrectProgramId);
		}
		let farm_data = Farm::try_from_slice(&farm_account.data.borrow())?;

		if *refund_account.key != farm_data.refund_account {
			msg!("Invaild refund Account ");
			//throw error
		}
		// Overwrite the data with zeroes
		write_data(batch_account, &vec![0; batch_account.data_len()], 0);

		// Close the account by transferring the rent sol
		let source_amount: &mut u64 = &mut batch_account.lamports.borrow_mut();
		let dest_amount: &mut u64 = &mut refund_account.lamports.borrow_mut();
		*dest_amount += *source_amount;
		*source_amount = 0;

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
			PoultryFarmInstructions::DeleteAndClaim => {
				Processor::delete_and_claim(program_id, accounts)?
			}
		}
		Ok(())
	}
}
