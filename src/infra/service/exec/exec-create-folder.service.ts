import { singleton } from "tsyringe";
import { ExecCommandService } from "./exec-command.service";
import {
  BaseFieldModel
} from "../../../model/param-domain/param-domain.model";
import { WriteLogService } from "../writer/write-log.service";
import {
  msgErrError
} from "../builder/message/error-msg-builder.service";
import {
  msgInfInfo
} from "../builder/message/info-msg-builder.service";

@singleton()
/**
 * The service is responsible for create the folder by name.
 * */
export class ExecCreateFolderService {
  constructor(
    private readonly execCommand: ExecCommandService,
    private readonly writeLog: WriteLogService
  ) {
  }

  createFolder(name: BaseFieldModel): boolean {
    if (!name.hasValue) {
      this.writeLog.message(
        msgErrError("The name argument cannot be empty!")
      );
      return false;
    }
    if (name.hasManyValues) {
      this.writeLog.message(
        msgErrError("The name argument cannot have many values!")
      );
      return false;
    }
    const nameValue: string = name.value[0];
    if (this.execCommand.pathExist(nameValue)) {
      this.writeLog.message(
        msgErrError(`The ${nameValue} folder already exist!`)
      );
      return false;
    }
    this.execCommand.createFolder(nameValue);
    this.writeLog.message(
      msgInfInfo(`Created the ${nameValue} folder`)
    );
    return true;
  }
}
