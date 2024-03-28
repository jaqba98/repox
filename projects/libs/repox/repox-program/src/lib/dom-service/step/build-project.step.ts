import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDomainStore } from '@lib/repox-workspace'

import { buildProjectStepMsg } from '../../const/message/step-message.const'
import { changePath, runCommand } from '@lib/utils'

@singleton()
/**
 * The step service is responsible for building project to the workspace domain.
 */
export class BuildProjectStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDomainStore
  ) {
  }

  run (name: string): boolean {
    this.stepMessage.write(buildProjectStepMsg(name))
    if (this.store.workspaceDomain == null) return false
    const project = this.store.workspaceDomain.repoxJsonDomain.projects[name]
    changePath(project.root)
    runCommand('npx tsc')
    return true
  }
}
