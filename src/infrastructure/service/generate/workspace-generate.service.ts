import { singleton } from "tsyringe";
import {
  msgCommandExecutedMessageInfo
} from "../builder/message/info-msg-builder.service";
import { ExecCmdService } from "../exec/exec-cmd.service";
import { WriteLogService } from "../writer/write-log.service";
import { WriteFileService } from "../writer/write-file.service";
import { DomainModel } from "../../../model/domain/domain.model";

@singleton()
/**
 * The service is responsible for run the shell command
 * in order to generate the workspace.
 */
export class WorkspaceGenerateService {
  constructor(
    private readonly execCommand: ExecCmdService,
    private readonly log: WriteLogService,
    private readonly writeFile: WriteFileService
  ) {
  }

  generate(name: string): void {
    this.execCommand.createFolder(name);
    this.execCommand.cd(name);
    this.execCommand.exec("git init");
    this.execCommand.createFile(".gitignore");
    this.execCommand.createFolder("apps");
    this.execCommand.createFolder("libs");
    this.execCommand.createFolder("tools");
    this.execCommand.createFile("apps/.gitkeep");
    this.execCommand.createFile("libs/.gitkeep");
    this.execCommand.createFile("tools/.gitkeep");
    this.execCommand.exec("npm init -y");
    this.execCommand.createFile("repox.json");
    this.writeFile.writeJsonFile<DomainModel>("repox.json", {
      version: "1.0.10",
      projects: {}
    });
    this.execCommand.exec("git config core.autocrlf false");
    this.execCommand.exec("git add .");
    this.execCommand.exec('git commit -m "init commit" -q');
    this.execCommand.cd("..");
    this.log.message(
      msgCommandExecutedMessageInfo(`Created the ${name} workspace`)
    );
  }
}
// todo: fix it