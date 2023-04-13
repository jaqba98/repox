import { singleton } from "tsyringe";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import {
  ReadParamDomainAppService
} from "../app-service/read-param-domain-app.service";
import { LogService } from "../infrastructure/service/writer/log.service";
import {
  SelectProgramAppService
} from "../app-service/select-program-app.service";
import {
  msgParamDtoValidationError
} from "../infrastructure/service/builder/message/error-msg-builder.service";
import {
  msgCommandExecutedCorrectlySuccess
} from "../infrastructure/service/builder/message/success-msg-builder.service";

@singleton()
/** Main launch point of the program. */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly readParamDomain: ReadParamDomainAppService,
    private readonly selectProgram: SelectProgramAppService,
    private readonly log: LogService
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
      this.log.message(msgParamDtoValidationError({
        ...paramDomain,
        paramDto: paramDto.paramDto
      }));
      return;
    }
    this.selectProgram.selectProgram(paramDomain.paramDomain);
    this.log.message(msgCommandExecutedCorrectlySuccess());
  }
}
// todo: fix it