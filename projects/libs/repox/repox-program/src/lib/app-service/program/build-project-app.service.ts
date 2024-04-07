import { singleton } from 'tsyringe';

import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { ProgramEnum } from '../../enum/launcher/program.enum';
import { GetCommandArgStringValueStep } from '../../dom-service/step/get-command-arg-string-value.step';

@singleton()
/**
 * The app-service program is responsible for building project.
 */
export class BuildProjectAppService {
  constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringValueStep
  ) {
  }

  run (): boolean {
    // Display headline
    if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    // Get arguments
    const name = this.getCommandArgStringValue.run('name', 'n');
    if (name === false) return false;
    return true;
  }
}
