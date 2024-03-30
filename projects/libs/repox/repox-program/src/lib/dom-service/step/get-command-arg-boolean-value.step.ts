// done
import { singleton } from 'tsyringe'

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger'
import { ParamDomainStore } from '@lib/param-domain'

import { getArgumentValue } from '../../const/message/step-message.const'
import { argumentWasNotSpecifiedErrorMsg } from '../../const/message/error-message.const'
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

  run (arg: string, alias: string, verbose: boolean = true): boolean {
    this.stepMessage.write(getArgumentValue(arg))
    if (this.paramDomainStore.hasCommandArg(arg)) return true
    if (this.paramDomainStore.hasCommandArg(alias)) return true
    if (verbose) {
      this.complexMessage.writeError([
        argumentWasNotSpecifiedErrorMsg(arg)
      ])
      this.complexMessage.writeWarning([
        specifyArgumentAndRunAgainWarningMsg(arg, 'boolean')
      ])
    }
    return false
  }
}
