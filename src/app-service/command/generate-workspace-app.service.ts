import { singleton } from "tsyringe";
import {
  EmptyArgsModel,
  ProgramGenerateCommandWorkspaceArgsModel
} from "../../model/param-domain/param-domain.model";
import {
  ExecCreateFolderService
} from "../../infra/service/exec/exec-create-folder.service";
import {
  WriteLogService
} from "../../infra/service/writer/write-log.service";
import {
  msgCommandExecutedCorrectlySuccess
} from "../../infra/service/builder/message/success-msg-builder.service";
import {
  msgCommandExecutedNotCorrectlyError
} from "../../infra/service/builder/message/error-msg-builder.service";

@singleton()
/**
 * The service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly execCreateFolder: ExecCreateFolderService,
    private readonly writeLog: WriteLogService
  ) {
  }
  run(
    programArgs: EmptyArgsModel,
    commandArgs: ProgramGenerateCommandWorkspaceArgsModel
  ): void {
    const { name } = commandArgs;
    if (!this.execCreateFolder.createFolder(name)) {
      this.writeLog.message(msgCommandExecutedNotCorrectlyError());
      return;
    }
    this.writeLog.message(msgCommandExecutedCorrectlySuccess());
  }
}
