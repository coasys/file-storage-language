use chrono::{DateTime, NaiveDateTime, Utc};
use hdk::prelude::*;

use integrity::{EntryTypes, Sample, SamplePrivate};

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
fn call(data: String) -> ExternResult<i64> {
    let now = get_now();
    let entry = EntryTypes::Sample(Sample { data: data.clone() });
    create_entry(entry)?;
    let after = get_now();
    let diff = (after - now).num_microseconds().unwrap();
    //debug!("call: {} microseconds", diff);
    Ok(diff)
}
