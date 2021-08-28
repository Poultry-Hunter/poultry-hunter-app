use num_derive::FromPrimitive;
use solana_program::{decode_error::DecodeError, program_error::ProgramError};
use thiserror::Error;

/// Errors that may be returned by the program.
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum PoultryError {
    #[error("Invalid Refund Account Passed")]
    InvalidRefundAccount,
    #[error("Distributor Already Added to batch")]
    DistributorAlreadyAdded,
    #[error("Seller Already Added to batch")]
    SellerAlreadyAdded,
}
impl From<PoultryError> for ProgramError {
    fn from(e: PoultryError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
impl<T> DecodeError<T> for PoultryError {
    fn type_of() -> &'static str {
        "PoultryError"
    }
}
