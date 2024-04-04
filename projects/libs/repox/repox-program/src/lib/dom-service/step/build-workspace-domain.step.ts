// done
import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { WorkspaceDomainStore, WorkspaceDtoStore } from '@lib/repox-workspace';
import { deepCopy } from '@lib/utils';
import { EMPTY_OBJECT } from '@lib/const';

import { buildWorkspaceDomainStepMsg } from '../../const/message/step-message.const';
import { SystemProgramEnum } from '../../enum/system-program/system-program.enum';

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
    this.stepMessage.write(buildWorkspaceDomainStepMsg());
    const repoxJsonDto = this.workspaceDtoStore.getRepoxJsonDto();
    this.workspaceDomainStore.workspaceDomain = {
      repoxJsonDomain: {
        defaultOptions: {
          packageManager: repoxJsonDto.defaultOptions?.packageManager ?? SystemProgramEnum.npm
        },
        projects: deepCopy(repoxJsonDto.projects) ?? deepCopy(EMPTY_OBJECT)
      }
    };
    return true;
  }
}
