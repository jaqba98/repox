import { singleton } from "tsyringe";
import {
  msgParamDtoValidationError
} from "../infra/service/builder/message/error-msg-builder.service";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import {
  msgCommandExecutedCorrectlySuccess
} from "../infra/service/builder/message/success-msg-builder.service";
import { LogService } from "../infra/service/writer/log.service";

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
    if (paramDto.isError) {
      this.log.message(msgParamDtoValidationError(paramDto));
      return;
    }
    this.log.message(msgCommandExecutedCorrectlySuccess());
  }
}
