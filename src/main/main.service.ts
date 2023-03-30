import { singleton } from "tsyringe";
import {
  msgParamDtoValidationError
} from "../infra/service/builder/message/error-msg-builder.service";
import {
  ReadParamDtoAppService
} from "../app-service/read-param-dto-app.service";
import { LogService } from "../infra/service/writer/log.service";
import {
  ReadParamDomainAppService
} from "../app-service/read-param-domain-app.service";
import {
  SelectProgramAppService
} from "../app-service/select-program-app.service";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoAppService,
    private readonly readParamDomain: ReadParamDomainAppService,
    private readonly log: LogService,
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
