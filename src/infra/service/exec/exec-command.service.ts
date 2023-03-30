import { LogService } from "../writer/log.service";
import { execSync } from "child_process";
import {
  msgExecCommandSuccess
} from "../builder/message/success-msg-builder.service";
import { singleton } from "tsyringe";
import { chdir } from "process";

@singleton()
export class ExecCommandService {
  constructor(private readonly log: LogService) {
  }

  exec(command: string): void {
    execSync(command);
    this.log.message(msgExecCommandSuccess(command));
  }

  cd(path: string): void {
    chdir(path);
  }
}
