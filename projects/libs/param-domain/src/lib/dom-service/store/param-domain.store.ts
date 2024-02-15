import {singleton} from "tsyringe";

import {ParamDomain} from "../domain/param-domain";
import {deepCopy} from "@lib/utils";

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
        return !!this.get().programArgs[programArg];
    }

    hasCommandArg(commandArg: string): boolean {
        return !!this.get().commandArgs[commandArg];
    }

    getCommandArg(commandArg: string, commandAlias: string): string[] | undefined {
        if (this.hasCommandArg(commandArg)) {
            return this.get().commandArgs[commandArg].values;
        }
        if (this.hasCommandArg(commandAlias)) {
            return this.get().commandArgs[commandAlias].values;
        }
        return undefined;
    }
}
