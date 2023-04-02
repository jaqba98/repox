import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";
import { ProgramEnum } from "../enum/program.enum";
import { CommandEnum } from "../enum/command.enum";
import {
  GenerateWorkspaceAppService
} from "./generate-workspace-app.service";
import {
  msgCommandExecutedCorrectlySuccess
} from "../infra/service/builder/message/success-msg-builder.service";
import { LogService } from "../infra/service/writer/log.service";
import {
  msgCommandNotExecutedCorrectlyError
} from "../infra/service/builder/message/error-msg-builder.service";

@singleton()
export class SelectProgramAppService {
  constructor(
    private readonly generateWorkspaceApp: GenerateWorkspaceAppService,
    private readonly log: LogService
  ) {
  }

  selectProgram(paramDomain: ParamDomainModel): void {
   if (
     paramDomain.program.name === ProgramEnum.generate &&
     paramDomain.command.name === CommandEnum.workspace
   ) {
     this.generateWorkspaceApp.run(paramDomain);
     this.log.message(msgCommandExecutedCorrectlySuccess());
   } else {
     this.log.message(msgCommandNotExecutedCorrectlyError());
   }
  }
}
// todo: refactor