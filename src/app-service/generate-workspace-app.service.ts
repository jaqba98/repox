import { singleton } from "tsyringe";
import {
  ExecCmdService
} from "../infra/service/exec/exec-cmd.service";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";
import { LogService } from "../infra/service/writer/log.service";
import {
  msgCommandExecutedMessageInfo
} from "../infra/service/builder/message/info-msg-builder.service";

@singleton()
/**
 * The service is responsible for generate workspace.
 */
export class GenerateWorkspaceAppService {
  constructor(
    private readonly execCommand: ExecCmdService,
    private readonly log: LogService
  ) {
  }

  run(paramDomain: ParamDomainModel): void {
    const commandArgs = this.getCommandArgs(paramDomain);
    commandArgs.name.forEach(name => this.generateWorkspace(name));
  }

  private generateWorkspace(name: string): void {
    this.execCommand.exec(`mkdir ${name}`);
    this.execCommand.cd(name);
    this.execCommand.exec("git init");
    this.execCommand.createFile(".gitignore");
    this.execCommand.exec("git config core.autocrlf false");
    this.execCommand.exec("npm init -y");
    this.execCommand.exec("mkdir apps");
    this.execCommand.createFile("apps/.gitkeep");
    this.execCommand.exec("mkdir libs");
    this.execCommand.createFile("libs/.gitkeep");
    this.execCommand.exec("mkdir tools");
    this.execCommand.createFile("tools/.gitkeep");
    this.execCommand.createFile("repox.json");
    this.execCommand.exec("git add .");
    this.execCommand.exec('git commit -m "init commit" -q');
    this.execCommand.cd("..");
    this.log.message(
      msgCommandExecutedMessageInfo(`Created the ${name} workspace`)
    );
  }

  private getCommandArgs(paramDomain: ParamDomainModel): {
    name: Array<string>
  } {
    const {args} = paramDomain.command;
    const name = args.find(arg => arg.name === "name")?.values ?? [];
    return {name};
  }
}
