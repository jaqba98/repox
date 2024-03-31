// done
import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { ParamDomainStore } from '@lib/param-domain'

import { getArgumentValueStepMsg } from '../../const/message/step-message.const'
import { argumentDoesNotHaveValidValueTypeErrorMsg, argumentWasNotSpecifiedErrorMsg } from '../../const/message/error-message.const'
import { specifyArgumentAndRunAgainWarningMsg } from '../../const/message/warning-message.const'

@singleton()
/**
 * The step dom-service is responsible for getting command argument
 * from the param domain store which has boolean value.
 */
export class GetCommandArgBooleanValueStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly paramDomainStore: ParamDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {}

  run (arg: string, alias: string, required: boolean = true): boolean {
    this.stepMessage.write(getArgumentValueStepMsg(arg))
    if (this.paramDomainStore.hasCommandArg(arg)) {
      return this.checkArgumentValueType(arg, arg, alias)
    }
    if (this.paramDomainStore.hasCommandArg(alias)) {
      return this.checkArgumentValueType(alias, arg, alias)
    }
    if (!required) return true
    this.complexMessage.writeError([
      argumentWasNotSpecifiedErrorMsg(arg, alias)
    ])
    this.complexMessage.writeWarning([
      specifyArgumentAndRunAgainWarningMsg(arg, alias, 'boolean')
    ])
    return false
  }

  private checkArgumentValueType (argToCheck: string, arg: string, alias: string): boolean {
    const paramDomain = this.paramDomainStore.get()
    const commandArg = paramDomain.commandArgs[argToCheck]
    if (commandArg === undefined) return false
    if (commandArg.hasValue) {
      this.complexMessage.writeError([
        argumentDoesNotHaveValidValueTypeErrorMsg(arg, alias)
      ])
      this.complexMessage.writeWarning([
        specifyArgumentAndRunAgainWarningMsg(arg, alias, 'boolean')
      ])
      return false
    }
    return true
  }
}
