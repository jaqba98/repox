import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {SimpleMessageAppService, StepMessageAppService} from "@lib/logger";

import {
    argumentIsNotSpecified,
    argumentMustHaveSingleTextValue
} from "../../const/message/error-message.enum";
import {moreInfoLookThroughOurDocs} from "../../const/message/warning-message.const";
import {
    getCommandArgSingleValue
} from "../../const/message/step-message.const";

@singleton()
/**
 * The step service is responsible for getting command argument single value
 * from the param domain store.
 */
export class GetCommandArgSingleValueStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly store: ParamDomainStore,
        private readonly simpleMessage: SimpleMessageAppService
    ) {
    }

    run(arg: string, alias: string, defaultValue?: string): string | undefined {
        this.stepMessage.write(getCommandArgSingleValue(arg));
        const commandArgValues = this.store.getCommandArgValues(arg, alias);
        if (!commandArgValues) {
            if (defaultValue) return defaultValue;
            this.simpleMessage.writeError(argumentIsNotSpecified(arg, alias));
            this.simpleMessage.writeWarning(moreInfoLookThroughOurDocs());
            return undefined;
        }
        if (commandArgValues.length !== 1) {
            this.simpleMessage.writeError(argumentMustHaveSingleTextValue(arg, alias));
            this.simpleMessage.writeWarning(moreInfoLookThroughOurDocs());
            return undefined;
        }
        return commandArgValues[0];
    }
}