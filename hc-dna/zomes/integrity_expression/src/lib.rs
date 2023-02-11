use chrono::{DateTime, Utc};
use hdi::prelude::*;

#[derive(Serialize, Deserialize, Clone, SerializedBytes, Debug)]
pub struct ExpressionProof {
    pub signature: String,
    pub key: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, SerializedBytes)]
pub struct Expression {
    pub author: String,
    pub proof: ExpressionProof,
    pub timestamp: DateTime<Utc>,
    pub data: SerializedBytes,
}

app_entry!(Expression);

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    #[entry_def(visibility = "public")]
    Expression(Expression),
}
