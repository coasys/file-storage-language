import type { Address, AgentService, PublicSharing, LanguageContext, HolochainLanguageDelegate } from "@perspect3vism/ad4m";
import pako from "pako";
import { FileStorage } from "./file-storage";
import { DNA_NICK } from "./dna";
import { Blob } from "buffer";
import type { FileExpression, FileMetadata } from "./types";

export interface FileData {
    name: string;
    file_type: string;
    data_base64: string;
}

export class FileStoragePutAdapter implements PublicSharing {
    #agent: AgentService
    #DNA: HolochainLanguageDelegate;

    constructor(context: LanguageContext) {
        this.#agent = context.agent
        this.#DNA = context.Holochain as HolochainLanguageDelegate;
    }

    async createPublic(fileData: FileData): Promise<Address> {
        try {
            // Just in case...
            if(typeof fileData === "string"){
                //@ts-ignore
                fileData = JSON.parse(fileData)
            }
        }catch(e){}

        const storage = new FileStorage((fn_name, payload) => this.#DNA.call(DNA_NICK, "file-storage", fn_name, payload));

        const data_uncompressed = Buffer.from(fileData.data_base64, 'base64')
        const data_compressed = pako.deflate(data_uncompressed)
        const blob = new Blob([data_compressed])

        const hashes = await storage.upload(blob);
        
        const fileMetadata = {
            name: fileData.name,
            size: data_uncompressed.length,
            file_type: fileData.file_type,
            checksum: "1234",
            chunks_hashes: hashes
        } as FileMetadata

        const expression: FileExpression = this.#agent.createSignedExpression(fileMetadata)
        const address = await storage.storeFileExpression(expression)
        return address.toString()
    }
}