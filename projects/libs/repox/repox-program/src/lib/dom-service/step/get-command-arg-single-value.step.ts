import {singleton} from "tsyringe";

import {ParamDomainStore} from "@lib/param-domain";
import {ComplexMessageAppService, StepMessageAppService} from "@lib/logger";

import {argumentIsNotSpecifiedMsg} from "../../const/message/error-message.enum";
import {moreInfoLookThroughOurDocsMsg} from "../../const/message/warning-message.const";
import {getCommandArgSingleValueMsg} from "../../const/message/step-message.const";

@singleton()
/**
 * The step service is responsible for getting command argument single value
 * from the param domain store.
 */
export class GetCommandArgSingleValueStep {
    constructor(
        private readonly stepMessage: StepMessageAppService,
        private readonly store: ParamDomainStore,
        private readonly complexMessage: ComplexMessageAppService
    ) {
    }

    run(arg: string, alias: string, defaultValue?: string): string | undefined {
        this.stepMessage.write(getCommandArgSingleValueMsg(arg));
        const commandArgValues = this.store.getCommandArgValues(arg, alias);
        if (!commandArgValues) {
            if (defaultValue) return defaultValue;
            this.complexMessage.writeError([
                argumentIsNotSpecifiedMsg(arg, alias)
            ]);
            this.complexMessage.writeWarning([
                moreInfoLookThroughOurDocsMsg()
            ]);
            return undefined;
        }
        if (commandArgValues.length !== 1) {
            this.complexMessage.writeError([
                argumentIsNotSpecifiedMsg(arg, alias)
            ]);
            this.complexMessage.writeWarning([
                moreInfoLookThroughOurDocsMsg()
            ]);
            return undefined;
        }
        return commandArgValues[0];
    }
}
