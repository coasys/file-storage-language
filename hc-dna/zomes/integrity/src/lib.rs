use chrono::{DateTime, Utc};
use hdi::prelude::*;

use hc_zome_file_storage_integrity::{FileChunk, FileMetadata};

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

app_entry!(FileChunk);

app_entry!(FileMetadata);

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    #[entry_def(visibility = "public")]
    Expression(Expression),
    #[entry_def(visibility = "public")]
    FileChunk(FileChunk),
    #[entry_def(visibility = "public")]
    FileMetadata(FileMetadata),
}
