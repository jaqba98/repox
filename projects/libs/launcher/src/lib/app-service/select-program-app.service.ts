import { container, singleton } from "tsyringe";
import {
  BuildRunProgramNameService
} from "../dom-service/build-run-program-name.service";
import { CommandEnum, ProgramEnum } from "@lib/param-domain";
import {
  BuildProjectProgramService,
  GenerateProjectProgramService,
  GenerateWorkspaceProgramService,
  ProgramDefaultProgramService
} from "@lib/program";

@singleton()
/**
 * The app service is responsible for select service to run
 * by given program name and command name.
 */
export class SelectProgramAppService {
  constructor(
    private readonly getRunProgramName: BuildRunProgramNameService
  ) {
  }

  selectProgram(): void {
    const programName = this.getRunProgramName.getProgramName();
    switch (programName) {
      case `${ProgramEnum.default}-${CommandEnum.default}`:
        container.resolve(ProgramDefaultProgramService).run();
        return;
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        container.resolve(GenerateWorkspaceProgramService).run();
        return;
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        container.resolve(GenerateProjectProgramService).run();
        return;
      case `${ProgramEnum.build}-${CommandEnum.project}`:
        container.resolve(BuildProjectProgramService).run();
        return;
      default:
        throw new Error(
          "Not found implementation for given program!"
        );
    }
  }
}
