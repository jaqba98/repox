// done
import { singleton } from "tsyringe";

import { ComplexMessageAppService, StepMessageAppService } from "@lib/logger";
import { ParamDomainStore } from "@lib/param-domain";

import { getArgumentValueStepMsg } from "../../const/message/step-message.const";
import { argumentDoesNotHaveValidValueTypeErrorMsg, argumentWasNotSpecifiedErrorMsg } from "../../const/message/error-message.const";
import { specifyArgumentAndRunAgainWarningMsg } from "../../const/message/warning-message.const";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The step dom-service is responsible for getting command argument
 * from the param domain store which has string value.
 */
export class GetCommandArgStringValueStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly paramDomainStore: ParamDomainStore,
    private readonly complexMessage: ComplexMessageAppService
    ) {}

    run (arg: string, alias: string, required: boolean = true): string | false {
        this.stepMessage.write(getArgumentValueStepMsg(arg));
        if (this.paramDomainStore.hasCommandArg(arg)) {
            return this.checkArgumentValueType(arg, arg, alias);
        }
        if (this.paramDomainStore.hasCommandArg(alias)) {
            return this.checkArgumentValueType(alias, arg, alias);
        }
        if (!required) return EMPTY_STRING;
        this.complexMessage.writeError([
            argumentWasNotSpecifiedErrorMsg(arg, alias)
        ]);
        this.complexMessage.writeWarning([
            specifyArgumentAndRunAgainWarningMsg(arg, alias, "string")
        ]);
        return false;
    }

    private checkArgumentValueType (argToCheck: string, arg: string, alias: string): string | false {
        const paramDomain = this.paramDomainStore.get();
        const commandArg = paramDomain.commandArgs[argToCheck];
        if (commandArg === undefined) return false;
        if (commandArg.hasValue && !commandArg.hasManyValues) return commandArg.values[0];
        this.complexMessage.writeError([
            argumentDoesNotHaveValidValueTypeErrorMsg(arg, alias)
        ]);
        this.complexMessage.writeWarning([
            specifyArgumentAndRunAgainWarningMsg(arg, alias, "string")
        ]);
        return false;
    }
}
