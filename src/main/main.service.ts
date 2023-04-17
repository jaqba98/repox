import {
  msgCommandExecutedCorrectlySuccess
} from "../infra/service/builder/message/success-msg-builder.service";
import { singleton } from "tsyringe";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import {
  ReadParamDomainAppService
} from "../app-service/read-param-domain-app.service";
import {
  WriteLogService
} from "../infra/service/writer/write-log.service";
import {
  msgParamDtoValidationError
} from "../infra/service/builder/message/error-msg-builder.service";

@singleton()
/** Main launch point of the program. */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly readParamDomain: ReadParamDomainAppService,
    private readonly log: WriteLogService
  ) {
  }

  run(): void {
    const paramDto = this.readParamDto.read();
    if (paramDto.isError) {
      this.log.message(msgParamDtoValidationError(paramDto));
      return;
    }
    const paramDomain = this.readParamDomain.build(paramDto.paramDto);
    if (paramDomain.isError) {
      // todo: fix the message
      this.log.message(msgParamDtoValidationError({
        ...paramDomain,
        paramDto: paramDto.paramDto
      }));
      return;
    }
    // todo: remove it
    console.log(JSON.stringify(paramDomain, null, 2))
    this.log.message(msgCommandExecutedCorrectlySuccess());
  }
}
