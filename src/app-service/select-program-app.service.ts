import { singleton } from "tsyringe";
import {
  GenerateWorkspaceAppService
} from "./generate-workspace-app.service";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";
import { ProgramEnum } from "../enum/program.enum";
import { CommandEnum } from "../enum/command.enum";
import {
  GenerateProjectAppService
} from "./generate-project-app.service";

@singleton()
/**
 * The service is responsible for select service to run by given
 * program and command.
 */
export class SelectProgramAppService {
  constructor(
    private readonly generateWorkspace: GenerateWorkspaceAppService,
    private readonly generateProject: GenerateProjectAppService
  ) {
  }

  selectProgram(paramDomain: ParamDomainModel): void {
    const runProgram = this.getRunProgramName(paramDomain);
    switch (runProgram) {
      case `${ProgramEnum.generate}-${CommandEnum.workspace}`:
        this.generateWorkspace.run(paramDomain);
        break;
      case `${ProgramEnum.generate}-${CommandEnum.project}`:
        this.generateProject.run(paramDomain);
        break;
      default:
        throw new Error(
          "Not found implementation for given program!"
        );
    }
  }

  private getRunProgramName(paramDomain: ParamDomainModel): string {
    return `${paramDomain.program.name}-${paramDomain.command.name}`;
  }
}
// todo: fix it