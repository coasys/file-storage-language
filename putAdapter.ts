import type { Address, AgentService, PublicSharing, LanguageContext } from "@perspect3vism/ad4m";
import pako from "pako";

export class FileStoragePutAdapter implements PublicSharing {
    #agent: AgentService

    constructor(context: LanguageContext) {
        this.#agent = context.agent
    }

    async createPublic(note: object): Promise<Address> {
        try {
            //@ts-ignore
            note = JSON.parse(note)
        }catch(e){

        }

        const agent = this.#agent
        const expression = agent.createSignedExpression(note)
        const content = JSON.stringify(expression)

        const contentCompressed = pako.deflate(content);
        return ""
    }
}