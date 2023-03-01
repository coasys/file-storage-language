use chrono::{DateTime, Utc};
use hdi::prelude::*;
use integrity_file_storage::FileMetadata;

#[derive(Serialize, Deserialize, Clone, SerializedBytes, Debug)]
pub struct ExpressionProof {
    pub signature: String,
    pub key: String,
}

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
pub struct FileExpression {
    pub author: String,
    pub proof: ExpressionProof,
    pub timestamp: DateTime<Utc>,
    pub data: FileMetadata,
}

app_entry!(FileExpression);

#[hdk_entry_defs]
#[unit_enum(UnitEntryTypes)]
pub enum EntryTypes {
    #[entry_def(visibility = "public")]
    FileExpression(FileExpression)
}