import { CallableCell, runScenario, Scenario } from "@holochain/tryorama";
import test from "tape-promise/tape.js";
import path from "path";
import { resolve } from "path";

const dnas = [{ source: {path: path.join("./happ/workdir/simple-dna.dna") } }];

test("create public entry and profile", async (t) => {
  await runScenario(async (scenario: Scenario) => {
        const [alice] = await scenario.addPlayersWithApps([{
            appBundleSource: {
                bundle: {
                    manifest: {
                        manifest_version: "1",
                        name: "zome",
                        roles: [{
                            name: "main",
                            dna: {
                                //@ts-ignore
                                path: resolve(dnas[0].source.path)
                            }
                        }]
                    },
                    resources: {}
                }
            }
        }]);

        // Shortcut peer discovery through gossip and register all agents in every
        // conductor of the scenario.
        await scenario.shareAllAgents();
        let timestamps: any[] = [];

        for (const n of [...Array(1000).keys()]) {
            let randomString = Math.random().toString(36).substring(7);
            const start = Date.now();
            const zomeCall = await alice.cells[0].callZome({
                zome_name: "zome",
                fn_name: "call",
                payload: randomString
            });
            const end = Date.now();
            let time = end - start;

            switch (n) {
                case 0:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 99:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 199:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 299:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 399:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 499:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 599:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 699:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 799:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 899:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
                case 999:
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMillis: time, call: n+1});
                    break;
            }
        }

        console.log("Timestamps: ", timestamps);
    })
})

test("create private entry, fetch and profile", async (t) => {
  await runScenario(async (scenario: Scenario) => {
        const [alice] = await scenario.addPlayersWithApps([{
            appBundleSource: {
                bundle: {
                    manifest: {
                        manifest_version: "1",
                        name: "zome",
                        roles: [{
                            name: "main",
                            dna: {
                                //@ts-ignore
                                path: resolve(dnas[0].source.path)
                            }
                        }]
                    },
                    resources: {}
                }
            }
        }]);

        // Shortcut peer discovery through gossip and register all agents in every
        // conductor of the scenario.
        await scenario.shareAllAgents();
        let timestamps: any[] = [];

        for (const n of [...Array(1000).keys()]) {
            let randomString = Math.random().toString(36).substring(7);
            const start = Date.now();
            const zomeCall = await alice.cells[0].callZome({
                zome_name: "zome",
                fn_name: "call_private_entry",
                payload: randomString
            });
            const end = Date.now();
            let time = end - start;
            //console.log("Call " + n + " took " + time + " ms");
            let fetchPrivateEntries: any;

            switch (n) {
                case 0:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 99:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 199:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 299:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 399:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 499:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 599:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 699:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 799:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 899:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
                case 999:
                    fetchPrivateEntries = await fetchPrivateEntry(alice.cells[0]);
                    timestamps.push({zomeCallInternalExecutionMicroseconds: zomeCall, roundTripMs: time, call: n+1, fetchZomeCallInternalExecutionMs: fetchPrivateEntries.zomeCallTime, fetchRoundTripMs: fetchPrivateEntries.roundTripTime});
                    break;
            }
        }

        console.log("Timestamps: ", timestamps);
    })
})

async function fetchPrivateEntry(callableCell: CallableCell): Promise<{roundTripTime: number, zomeCallTime: number}> {
    const start = Date.now();
    const zomeCall = await callableCell.callZome({
        zome_name: "zome",
        fn_name: "fetch_last_5_from_source_chain"
    });
    const end = Date.now();
    let time = end - start;
    //console.log("Call took " + time + " ms");
    return {roundTripTime: time, zomeCallTime: zomeCall as number};
}
