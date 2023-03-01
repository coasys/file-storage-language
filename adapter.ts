import type { Address, Expression, ExpressionAdapter, PublicSharing, LanguageContext, HolochainLanguageDelegate } from "@perspect3vism/ad4m";
import { FileStoragePutAdapter } from './putAdapter'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import pako from "pako";
import { FileStorage } from "./file-storage";
import { DNA_NICK } from "./dna";
import type { FileExpression } from "./types";

export default class Adapter implements ExpressionAdapter {
    putAdapter: PublicSharing
    #DNA: HolochainLanguageDelegate;

    constructor(context: LanguageContext) {
        this.putAdapter = new FileStoragePutAdapter(context)
        this.#DNA = context.Holochain as HolochainLanguageDelegate;
    }

    async get(address: Address): Promise<Expression> {
        const storage = new FileStorage((fn_name, payload) => this.#DNA.call(DNA_NICK, "file-storage", fn_name, payload));

        const expression = (await storage.getFileExpression(Uint8Array.from(address, x => x.charCodeAt(0)))) as FileExpression
        const data_compressed = await storage.download(expression.data.chunks_hashes);
        const data_uncompressed = pako.inflate(data_compressed, { to: 'string' });
        const buffer = Buffer.from(data_uncompressed.arrayBuffer())
        const data_base64 = buffer.toString('base64')
        expression.data.data_base64 = data_base64
        return expression
    }
}