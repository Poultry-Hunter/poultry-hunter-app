use solana_program::{
	account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

use crate::instruction::PoultryFarmInstructions;

pub struct Processor;
impl Processor {
	pub fn process(program_id: &Pubkey, accounts: &[AccountInfo], instruction_data: &[u8]) -> ProgramResult {
		Ok(())
	}
}