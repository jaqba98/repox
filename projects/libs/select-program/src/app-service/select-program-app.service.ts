import {
  GetRunProgramNameService
} from "../dom-service/get-run-program-name.service";
import { container, singleton } from "tsyringe";
import {
  CommandEnum,
  ParamDomainModel,
  ProgramEnum
} from "@lib/parameter";
import {
  GenerateProjectProgramService,
  GenerateWorkspaceProgramService,
  ProgramDefaultProgramService
} from "@lib/program";

@singleton()
/**
 * The service is responsible for select service to run by given
 * program name and program name.
 */
export class SelectProgramAppService {
  constructor(
    private readonly getRunProgramName: GetRunProgramNameService
  ) {
  }

  selectProgram(paramDomain: ParamDomainModel): void {
    const name = this.getRunProgramName.getProgramName(paramDomain);
    switch (name) {
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
      default:
        throw new Error("Not found implementation for given action!");
    }
  }
}
// todo: refactor