import {singleton} from "tsyringe";

import {arrayHasOneElement, deepCopy} from "@lib/utils";
import {SimpleMessageAppService} from "@lib/logger";

import {ParamDomain} from "../domain/param-domain";
import {
    aliasMustHaveSingleTextValue, argumentIsNotSpecified,
    argumentMustHaveSingleTextValue
} from "../../const/message/error-message.const";

@singleton()
/**
 * The store contains the param domain model.
 */
export class ParamDomainStore {
    private paramDomain: ParamDomain | undefined;

    constructor(private readonly simpleMessage: SimpleMessageAppService) {
    }

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

    getCommandArg(arg: string, alias: string, defaultValue?: string): string | undefined {
        if (this.hasCommandArg(arg)) {
            const {values} = this.get().commandArgs[arg];
            if (arrayHasOneElement(values)) return values.at(0);
            this.simpleMessage.writeError(argumentMustHaveSingleTextValue(arg));
            return undefined;
        }
        if (this.hasCommandArg(alias)) {
            const {values} = this.get().commandArgs[alias];
            if (arrayHasOneElement(values)) return values.at(0);
            this.simpleMessage.writeError(aliasMustHaveSingleTextValue(alias));
            return undefined;
        }
        if (defaultValue) return defaultValue;
        this.simpleMessage.writeError(argumentIsNotSpecified(arg));
        return undefined;
    }
}
