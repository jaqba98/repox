import { injectable } from "tsyringe";
import { ReadParamsSvc } from "../infrastructure/service/reader/read-params.service";
import { VerifyParamsDtoSvc } from "../infrastructure/service/verify/verify-params-dto.service";
import { LogSvc } from "../infrastructure/service/writer/log.service";

@injectable()
export class ReadParamsAppSvc {
  constructor(
    private readonly readParams: ReadParamsSvc,
    private readonly verifyParamsDto: VerifyParamsDtoSvc,
    private readonly log: LogSvc
  ) { }

  run(): any {
    const paramsDto = this.readParams.read();
    const verifyParamsDto = this.verifyParamsDto.verify(paramsDto);
    if (!verifyParamsDto.success) {
      this.log.write({
        mode: "err",
        msg: verifyParamsDto.msg,
        newLine: false,
      });
    }
    // TODO: Build the domain model from DTO model
    // TODO: Verify the domain model
    // TODO: Return the domain model
    return undefined;
  }
}
