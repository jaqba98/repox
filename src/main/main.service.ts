import { singleton } from "tsyringe";
import {
  ReadParamDtoApp
} from "../app-service/service/read-param-dto-app";
import {
  ReadParamDomainApp
} from "../app-service/service/read-param-domain-app";
import {
  msgParamDtoValidationError
} from "../infra/service/builder/message/error-msg-builder.service";
import {
  SelectProgramApp
} from "../app-service/service/select-program-app";
import { WriteLog } from "../infra/service/writer/write-log";

/**
 * Main launch point of the command.
 */
@singleton()
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoApp,
    private readonly readParamDomain: ReadParamDomainApp,
    private readonly selectProgram: SelectProgramApp,
    private readonly writeLog: WriteLog,
  ) {
  }

  run(): void {
    const paramDto = this.readParamDto.read();
    if (!paramDto.success) {
      this.writeLog.message(msgParamDtoValidationError(paramDto));
      return;
    }
    const paramDomain = this.readParamDomain.build(paramDto.paramDto);
    if (!paramDomain.success) {
      this.writeLog.message(msgParamDtoValidationError({
        ...paramDomain,
        paramDto: paramDto.paramDto
      }));
      return;
    }
    this.selectProgram.selectProgram(paramDomain.paramDomain);
  }
}
