import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { WorkspaceDtoStore } from '@lib/repox-workspace';

import { saveWorkspaceDtoStepMsg } from '../../const/message/step-message.const';

@singleton()
/**
 * The step service is responsible for saving workspace dto model.
 */
export class SaveWorkspaceDtoStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly store: WorkspaceDtoStore
  ) {
  }

  run (): boolean {
    this.stepMessage.write(saveWorkspaceDtoStepMsg());
    // this.store.save()
    return true;
  }
}
