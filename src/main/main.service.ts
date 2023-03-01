import { singleton } from "tsyringe";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import { LogService } from "../infra/service/writer/log.service";
import {
  buildCommandExecutedCorrectlyMsg,
} from "../infra/service/builder/succ-msg-builder.service";
import {
  buildParamDtoValidationErrorMsg
} from "../infra/service/builder/err-msg-builder.service";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly log: LogService
  ) {
  }

  run(): void {
    const paramDto = this.readParamDto.read();
    paramDto.length === 0 ?
      this.log.msg(buildCommandExecutedCorrectlyMsg()) :
      this.log.msg(buildParamDtoValidationErrorMsg(paramDto));
  }
}
