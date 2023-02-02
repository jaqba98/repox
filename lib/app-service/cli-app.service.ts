import { injectable } from "tsyringe";
import { LogService } from "../infrastructure/service/log.service";
import { ReadParamsService } from "../infrastructure/service/read-params.service";

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
      const params = this.readParams.read();
      console.log(params);
    } catch (error: any) {
      this.log.log({ status: "exception", msg: error });
    }
  }
}
