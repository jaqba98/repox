// todo: I am here
import { singleton } from 'tsyringe'

import { ParamDomainStore } from '@lib/param-domain'
import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'

import { getBooleanCommandArgValueStepMsg } from '../../const/message/step-message.const'
import { argumentIsNotSpecifiedErrorMsg } from '../../const/message/error-message.const'
import {
  specifyArgumentCorrectlyWarningMsg
} from '../../const/message/warning-message.const'

@singleton()
/**
 * The step service is responsible for getting command argument boolean value
 * from the param domain store.
 */
export class GetCommandArgBooleanValueStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: ParamDomainStore,
    private readonly complexMessage: ComplexMessageAppService
  ) {
  }

  run (arg: string, alias: string): boolean {
    this.stepMessage.write(getBooleanCommandArgValueStepMsg(arg))
    if (this.store.hasCommandArg(arg)) return true
    if (this.store.hasCommandArg(alias)) return true
    this.complexMessage.writeError([
      argumentIsNotSpecifiedErrorMsg(arg)
    ])
    this.complexMessage.writeWarning([
      specifyArgumentCorrectlyWarningMsg(arg)
    ])
    return false
  }
}
