// done
import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'
import { WorkspaceDomainStore, WorkspaceDtoStore } from '@lib/repox-workspace'
import { deepCopy } from '@lib/utils'
import { EMPTY_OBJECT, EMPTY_STRING } from '@lib/const'

import { buildWorkspaceDomainStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step dom-service is responsible for
 * building workspace domain model.
 */
export class BuildWorkspaceDomainStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDtoStore: WorkspaceDtoStore,
    private readonly workspaceDomainStore: WorkspaceDomainStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write(buildWorkspaceDomainStepMsg())
    const repoxJsonDto = this.workspaceDtoStore.getRepoxJsonDto()
    this.workspaceDomainStore.workspaceDomain = {
      repoxJsonDomain: {
        defaultOptions: {
          packageManager: repoxJsonDto.defaultOptions?.packageManager ?? EMPTY_STRING
        },
        projects: deepCopy(repoxJsonDto.projects) ?? deepCopy(EMPTY_OBJECT)
      }
    }
    return true
  }
}
