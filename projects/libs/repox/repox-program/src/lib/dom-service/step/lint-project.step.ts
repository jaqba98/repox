// done
import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { runCommand } from '@lib/utils'

import { lintProjectStepMsg } from '../../const/message/step-message.const'
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum'

@singleton()
/**
 * The step dom-service is responsible for linting projects.
 */
export class LintProjectStep {
  constructor (private readonly stepMessage: StepMessageAppService) {}

  run (packageManager: SystemProgramEnum, fix: boolean): boolean {
    this.stepMessage.write(lintProjectStepMsg())
    const fixArg = fix ? '--fix' : ''
    const command = `eslint projects/**/*.ts ${fixArg}`
    switch (packageManager) {
      case SystemProgramEnum.npm:
        runCommand(`npx ${command}`)
        break
      case SystemProgramEnum.pnpm:
        runCommand(`pnpm run ${command}`)
        break
      case SystemProgramEnum.yarn:
        runCommand(`yarn run ${command}`)
        break
    }
    return true
  }
}
