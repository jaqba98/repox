// todo: refactor
import { singleton } from "tsyringe";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import { LogService } from "../infrastructure/service/writer/log.service";
import {
  msgCommandExecutedCorrectlySuccess,
} from "../infrastructure/service/builder/message/success-message-builder.service";
import {
  msgParamDtoValidationError
} from "../infrastructure/service/builder/message/error-message-builder.service";
import {
  ReadParamDomainAppService
} from "../app-service/read-param-domain-app.service";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly readParamDomain: ReadParamDomainAppService,
    private readonly log: LogService
  ) {
  }

  run(): void {
    const readParamDto = this.readParamDto.read();
    const { paramDto, verifyDto } = readParamDto;
    if (verifyDto !== true) {
      this.log.msg(msgParamDtoValidationError(paramDto, verifyDto));
      return;
    }
    const readParamDomain = this.readParamDomain.read(paramDto);
    const { paramDomain, verifyDomain } = readParamDomain;
    if (verifyDomain !== true) {
      this.log.msg(msgParamDtoValidationError(paramDto, verifyDomain));
      return;
    }
    this.log.msg(msgCommandExecutedCorrectlySuccess());
  }
}
