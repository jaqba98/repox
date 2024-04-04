import { singleton } from 'tsyringe';

import { StepMessageAppService } from '@lib/logger';
import { RunCommandUtilsService } from '@lib/utils';

import { runCommandStepMsg } from '../../const/message/step-message.const';

@singleton()
/**
 * The step service is responsible for running command.
 */
export class RunCommandStep {
  constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly runCommandUtils: RunCommandUtilsService
  ) {
  }

  run (command: string, verbose: boolean = false): boolean {
    this.stepMessage.write(runCommandStepMsg(command));
    this.runCommandUtils.runCommand(command, verbose);
    return true;
  }
}
