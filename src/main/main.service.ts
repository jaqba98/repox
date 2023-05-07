import { singleton } from "tsyringe";
import {
  ReadParamDtoApp
} from "../app-service/service/read-param-dto-app";
import {
  ReadParamDomainApp
} from "../app-service/service/read-param-domain-app";

@singleton()
/** Main launch point of the program. */
export class MainService {
  constructor(
    private readonly readParamDto: ReadParamDtoApp,
    private readonly readParamDomain: ReadParamDomainApp
    // private readonly log: WriteLogService,
    // private readonly selectProgram: SelectProgramApp
  ) {
  }

  run(): void {
    const paramDto = this.readParamDto.read();
    // if (paramDto.isError) {
    //   this.log.message(msgParamDtoValidationError(paramDto));
    //   return;
    // }
    const paramDomain = this.readParamDomain.build(paramDto.paramDto);
    console.log(JSON.stringify(paramDomain, null, 2));
    // if (paramDomain.isError) {
    //   this.log.message(msgParamDtoValidationError({
    //     ...paramDomain,
    //     paramDto: paramDto.paramDto
    //   }));
    //   return;
    // }
    // this.selectProgram.selectProgram(paramDomain.paramDomain);
  }
}
