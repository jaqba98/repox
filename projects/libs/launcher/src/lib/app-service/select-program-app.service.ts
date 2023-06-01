import { container, singleton } from "tsyringe";
import {
  GetRunProgramNameService
} from "../dom-service/get-run-program-name.service";
import {
  CommandEnum,
  ParamDomainModel,
  ProgramEnum
} from "@lib/param-domain";
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
    private readonly getRunProgramName: GetRunProgramNameService
  ) {
  }

  selectProgram(paramDomain: ParamDomainModel): void {
    const programName = this.getRunProgramName.getProgramName(
      paramDomain
    );
    switch (programName) {
      case `${ProgramEnum.default}-${CommandEnum.default}`:
        container.resolve(ProgramDefaultProgramService)
          .run(paramDomain);
        return;
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        container.resolve(GenerateWorkspaceProgramService)
          .run(paramDomain);
        return;
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        container.resolve(GenerateProjectProgramService)
          .run(paramDomain);
        return;
      case `${ProgramEnum.build}-${CommandEnum.project}`:
        container.resolve(BuildProjectProgramService)
          .run(paramDomain);
        return;
      default:
        throw new Error(
          "Not found implementation for given program!"
        );
    }
  }
}
