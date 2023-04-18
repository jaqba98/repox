import { singleton } from "tsyringe";
import {
  ReadParamDtoAppService
} from "../app-service/service/read-param-dto-app.service";
import {
  ReadParamDomainAppService
} from "../app-service/service/read-param-domain-app.service";
import {
  WriteLogService
} from "../infra/service/writer/write-log.service";
import {
  msgParamDtoValidationError
} from "../infra/service/builder/message/error-msg-builder.service";
import {
  SelectProgramAppService
} from "../app-service/service/select-program-app.service";

@singleton()
/** Main launch point of the program. */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly readParamDomain: ReadParamDomainAppService,
    private readonly log: WriteLogService,
    private readonly selectProgram: SelectProgramAppService
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
  }
}
