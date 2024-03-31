// done
import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { ParamDomainStore } from '@lib/param-domain'

import { getArgumentValue } from '../../const/message/step-message.const'
import { argumentDoesNotHaveValidValueTypeErrorMsg, argumentWasNotSpecifiedErrorMsg } from '../../const/message/error-message.const'
import { specifyArgumentAndRunAgainWarningMsg } from '../../const/message/warning-message.const'

@singleton()
/**
 * The step dom-service is responsible for getting command argument
 * from the param domain store which has string array value.
 */
export class GetCommandArgStringArrayValueStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly paramDomainStore: ParamDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {}

  run (arg: string, alias: string, required: boolean = true): string[] | false {
    this.stepMessage.write(getArgumentValue(arg))
    if (this.paramDomainStore.hasCommandArg(arg)) {
      return this.checkArgumentValueType(arg, arg)
    }
    if (this.paramDomainStore.hasCommandArg(alias)) {
      return this.checkArgumentValueType(alias, arg)
    }
    if (!required) return []
    this.complexMessage.writeError([
      argumentWasNotSpecifiedErrorMsg(arg)
    ])
    this.complexMessage.writeWarning([
      specifyArgumentAndRunAgainWarningMsg(arg, 'string[]')
    ])
    return false
  }

  private checkArgumentValueType (argToCheck: string, argToWrite: string): string[] | false {
    const paramDomain = this.paramDomainStore.get()
    const commandArg = paramDomain.commandArgs[argToCheck]
    if (commandArg === undefined) return false
    if (commandArg.hasManyValues) return commandArg.values
    this.complexMessage.writeError([
      argumentDoesNotHaveValidValueTypeErrorMsg(argToWrite)
    ])
    this.complexMessage.writeWarning([
      specifyArgumentAndRunAgainWarningMsg(argToWrite, 'string[]')
    ])
    return false
  }
}
