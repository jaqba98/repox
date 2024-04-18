// done
import { singleton } from 'tsyringe';

import { ComplexMessageAppService, StepMessageAppService } from '@lib/logger';
import { RunGenerateWorkspaceAppService } from '@lib/repox-workspace';

import { generateWorkspaceStepMsg } from '../../const/message/step-message.const';
import { failedToGenerateWorkspaceErrorMsg } from '../../const/message/error-message.const';

@singleton()
/**
 * The step service is responsible for generating workspace.
 */
export class GenerateWorkspaceStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly runGenerateWorkspace: RunGenerateWorkspaceAppService,
    private readonly complexMessage: ComplexMessageAppService
  ) {
  }

  run (): boolean {
    this.stepMessage.write(generateWorkspaceStepMsg());
    if (this.runGenerateWorkspace.run()) return true;
    this.complexMessage.writeError([
      failedToGenerateWorkspaceErrorMsg()
    ]);
    return false;
  }
}
