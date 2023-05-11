import {
  GetRunProgramNameService
} from "../dom-service/get-run-program-name.service";
import { singleton } from "tsyringe";
import {
  CommandEnum,
  ParamDomainModel,
  ProgramEnum
} from "@lib/parameter";

@singleton()
/**
 * The service is responsible for select service to run by given
 * command name and command name.
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
        // container.resolve(ProgramDefaultApp).run(paramDomain);
        return;
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        // container.resolve(GenerateWorkspaceApp).run(paramDomain);
        return;
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        // container.resolve(GenerateProjectApp).run(paramDomain);
        return;
      default:
        throw new Error("Not found implementation for given action!");
    }
  }
}
