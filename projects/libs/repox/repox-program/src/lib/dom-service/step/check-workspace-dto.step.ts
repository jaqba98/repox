import { singleton } from 'tsyringe'

import { StepMessageAppService } from '@lib/logger'

import { checkWorkspaceDtoStepMsg } from '../../const/message/step-message.const'

@singleton()
/**
 * The step dom-service is responsible for
 * checking workspace dto model.
 */
export class CheckWorkspaceDtoStep {
  constructor (
    private readonly stepMessage: StepMessageAppService
  ) {}

  run (): boolean {
    this.stepMessage.write(checkWorkspaceDtoStepMsg())
    return true
    // this.simpleMessage.writePlain('Step: Verification WS dto')
    // enum verifyRepoxDto = this.wsDtoStore.verifyWsRepoxDto();
    // if (verifyRepoxDto.errors.length > 0) {
    //     this.simpleMessage.writeError(`Incorrect content of ${"WorkspaceFileEnum.repoxJsonFile"} file`);
    //     verifyRepoxDto.errors.forEach(error => this.simpleMessage.writeError(error.toString()));
    //     return false;
    // }
    // enum verifyTsconfigDto = this.wsDtoStore.verifyWsTsconfigDto();
    // if (verifyTsconfigDto.errors.length > 0) {
    //     this.simpleMessage.writeError(`Incorrect content of ${"WorkspaceFileEnum.tsconfigJsonFile"} file`);
    //     verifyTsconfigDto.errors.forEach(error => this.simpleMessage.writeError(error.toString()));
    //     return false;
    // }
  }
}
