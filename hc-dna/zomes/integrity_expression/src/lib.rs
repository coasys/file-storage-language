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


