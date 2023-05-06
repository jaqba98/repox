import { singleton } from "tsyringe";
import {
  ProgramDefaultAppService
} from "../command/program-default-app.service";
import {
  GenerateWorkspaceAppService
} from "../command/generate-workspace-app.service";
import {
  GenerateProjectAppService
} from "../command/generate-project-app.service";
import {
  EmptyArgsModel,
  ParamDomainModel,
  ProgramDefaultArgsModel,
  ProgramGenerateCommandProjectArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";
import { Program } from "../../enum/program";
import { Command } from "../../enum/command";

@singleton()
/**
 * The service is responsible for select service to run by given
 * program and command.
 */
export class SelectProgramApp {
  constructor(
    private readonly programDefault: ProgramDefaultAppService,
    private readonly generateWorkspace: GenerateWorkspaceAppService,
    private readonly generateProject: GenerateProjectAppService
  ) {
  }

  selectProgram(paramDomain: ParamDomainModel): void {
    const runProgram: string = this.getRunProgramName(paramDomain);
    switch (runProgram) {
      case `${Program.default}-${Command.default}`:
        this.programDefault.run(
          <ProgramDefaultArgsModel>paramDomain.program.args,
          <EmptyArgsModel>paramDomain.command.args
        );
        break;
      case `${Program.generate}-${Command.workspace}`:
        this.generateWorkspace.run(
          <EmptyArgsModel>paramDomain.program.args,
          <ProgramGenerateCommandWorkspaceArgsModel>paramDomain.command.args
        );
        break;
      case `${Program.generate}-${Command.project}`:
        this.generateProject.run(
          <EmptyArgsModel>paramDomain.program.args,
          <ProgramGenerateCommandProjectArgsModel>paramDomain.command.args
        );
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
