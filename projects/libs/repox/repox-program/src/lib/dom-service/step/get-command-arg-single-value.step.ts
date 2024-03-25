import { singleton } from 'tsyringe'

import { ParamDomainStore } from '@lib/param-domain'
import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'

import { getSingleCommandArgValueStepMsg } from '../../const/message/step-message.const'
import {
  argumentIsNotHaveSingleValueErrorMsg,
  argumentIsNotSpecifiedErrorMsg
} from '../../const/message/error-message.const'
import {
  specifyArgumentCorrectlyWarningMsg
} from '../../const/message/warning-message.const'

@singleton()
/**
 * The step service is responsible for getting command argument single value
 * from the param domain store.
 */
export class GetCommandArgSingleValueStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: ParamDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {
  }

  run (arg: string, alias: string, defaultValue?: string): string | undefined {
    this.stepMessage.write(getSingleCommandArgValueStepMsg(arg))
    const commandArgValues = this.store.getCommandArgValues(arg, alias)
    if (!commandArgValues) {
      if (defaultValue) return defaultValue
      this.complexMessage.writeError([
        argumentIsNotSpecifiedErrorMsg(arg)
      ])
      this.complexMessage.writeWarning([
        specifyArgumentCorrectlyWarningMsg(arg)
      ])
      return undefined
    }
    if (commandArgValues.length !== 1) {
      this.complexMessage.writeError([
        argumentIsNotHaveSingleValueErrorMsg(arg)
      ])
      this.complexMessage.writeWarning([
        specifyArgumentCorrectlyWarningMsg(arg)
      ])
      return undefined
    }
    return commandArgValues[0]
  }
}
