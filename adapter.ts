import type { Address, Expression, ExpressionAdapter, PublicSharing, LanguageContext } from "@perspect3vism/ad4m";
import { FileStoragePutAdapter } from './putAdapter'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import pako from "pako";

export default class Adapter implements ExpressionAdapter {
    putAdapter: PublicSharing

    constructor(context: LanguageContext) {
        this.putAdapter = new FileStoragePutAdapter(context)
    }

    async get(address: Address): Promise<Expression> {
        //const fileString = pako.inflate(uint8ArrayConcat(chunks), { to: 'string' });
        return {}
    }
}