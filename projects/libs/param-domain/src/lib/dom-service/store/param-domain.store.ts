import {singleton} from "tsyringe";

import {deepCopy} from "@lib/utils";

import {ParamDomain} from "../domain/param-domain";

@singleton()
/**
 * The store contains the param domain model.
 */
export class ParamDomainStore {
    private paramDomain: ParamDomain | undefined;

    get(): ParamDomain {
        if (!this.paramDomain) {
            throw new Error("The param domain store does not exist!");
        }
        return this.paramDomain;
    }

    set(paramDomain: ParamDomain): void {
        this.paramDomain = deepCopy(paramDomain);
    }

    hasProgramArg(programArg: string): boolean {
        return Boolean(this.get().programArgs[programArg]);
    }

    hasCommandArg(commandArg: string): boolean {
        return Boolean(this.get().commandArgs[commandArg]);
    }

    getCommandArgValues(arg: string, alias: string): string[] | undefined {
        if (this.hasCommandArg(arg)) {
            const {values} = this.get().commandArgs[arg];
            return values;
        }
        if (this.hasCommandArg(alias)) {
            const {values} = this.get().commandArgs[alias];
            return values;
        }
        return undefined;
    }
}
