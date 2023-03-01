use chrono::{DateTime, NaiveDateTime, Utc};
use hdk::prelude::*;
use integrity_expression::{FileExpression, EntryTypes as ExpressionEntryTypes};
use integrity_file_storage::{FileMetadata, EntryTypes as FileStorageEntryTypes};

extern crate hc_zome_file_storage_coordinator;

#[hdk_extern]
fn init(_: ()) -> ExternResult<InitCallbackResult> {
    Ok(InitCallbackResult::Pass)
}

pub fn get_now() -> DateTime<Utc> {
    match sys_time() {
        Ok(time) => {
            let now = time.as_seconds_and_nanos();
            let out = DateTime::<Utc>::from_utc(
                NaiveDateTime::from_timestamp_opt(now.0, now.1).unwrap(),
                Utc,
            );
            out
        }
        Err(_err) => Utc::now(),
    }
}



#[hdk_extern]
fn store_file_expression(expression: FileExpression) -> ExternResult<HoloHash<hdk::prelude::holo_hash::hash_type::Action>> {
    let entry = ExpressionEntryTypes::FileExpression(expression);
    Ok(create_entry(entry)?)
}
