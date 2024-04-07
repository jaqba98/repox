import { singleton } from 'tsyringe';

import { WriteHeaderStep } from '../../dom-service/step/write-header.step';
import { CommandEnum } from '../../enum/launcher/command.enum';
import { ProgramEnum } from '../../enum/launcher/program.enum';

@singleton()
/**
 * The app-service program is responsible for building project.
 */
export class BuildProjectAppService {
  constructor (private readonly writeHeader: WriteHeaderStep) {
  }

  run (): boolean {
    if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) return false;
    return true;
  }
}
