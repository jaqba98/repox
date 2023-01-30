import { injectable } from "tsyringe";
import { LoggerService } from "../infrastructure/service/logger.service";
import { ReadParametersService } from "../infrastructure/service/read-parameters.service";

@injectable()
/*
    The main application service that is responsible for
    managing the main flow of the application.
*/
export class CliAppService {
  constructor(
    private readonly readParameters: ReadParametersService,
    private readonly logger: LoggerService
  ) {}

  run(): void {
    try {
      throw new Error("asdasda");
      const params = this.readParameters.read();
      console.log(params);
    } catch (err: any) {
      this.logger.log(false, err.message, true);
    }
  }
}
