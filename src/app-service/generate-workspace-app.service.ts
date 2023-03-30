import { singleton } from "tsyringe";
import {
  ParamDomainModel
} from "../model/param-domain/param-domain.model";
import {
  ExecCommandService
} from "../infra/service/exec/exec-command.service";

@singleton()
export class GenerateWorkspaceAppService {
  constructor(private readonly execCommand: ExecCommandService) {
  }
  run(paramDomain: ParamDomainModel): void {
    const name = paramDomain.command.args.find(arg => arg.name === "name");

    this.execCommand.exec(`mkdir ${name?.value[0]}`);
    this.execCommand.cd(`./${name?.value[0]}`);
    this.execCommand.exec("git init");
    this.execCommand.exec("npm init -y");
    this.execCommand.exec("mkdir apps");
    this.execCommand.exec("touch apps/.gitkeep");
    this.execCommand.exec("mkdir libs");
    this.execCommand.exec("touch libs/.gitkeep");
    this.execCommand.exec("mkdir tools");
    this.execCommand.exec("touch tools/.gitkeep");
    this.execCommand.exec("git add .");
    this.execCommand.exec(`git commit -m "init commit" --quiet`);
  }
}
