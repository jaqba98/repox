import { injectable } from "tsyringe";
import { ParamsModel } from "../infrastructure/model/params.model";
import { LogService } from "../infrastructure/service/writer/log.service";
import { ReadParamsService } from "../infrastructure/service/reader/read-params.service";

@injectable()
/**
 * The main application service that is responsible for
 * managing the main flow of the application.
 */
export class CliAppService {
  constructor(
    private readonly readParams: ReadParamsService,
    private readonly log: LogService
  ) {}

  run(): void {
    try {
      const params: Array<ParamsModel> = this.readParams.read();
      console.log(params);
    } catch (error: any) {
      this.log.log({ status: "exception", msg: error });
    }
  }
}
