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

@singleton()
/** Main launch point of the program. */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoApp,
    private readonly readParamDomain: ReadParamDomainApp
    // private readonly log: WriteLog,
    // private readonly selectProgram: SelectProgramApp
  ) {
  }

  run(): void {
    const paramDto = this.readParamDto.read();
    if (!paramDto.success) {
      console.log(msgParamDtoValidationError(paramDto));
      // this.log.message(msgParamDtoValidationError(paramDto));
      return;
    }
    const paramDomain = this.readParamDomain.build(paramDto.paramDto);
    if (!paramDomain.success) {
      console.log(msgParamDtoValidationError({
        ...paramDomain,
        paramDto: paramDto.paramDto
      }));
      // this.log.message(msgParamDtoValidationError({
      //   ...paramDomain,
      //   paramDto: paramDto.paramDto
      // }));
      return;
    }
    // this.selectProgram.selectProgram(paramDomain.paramDomain);
  }
}
// todo: refactor this
