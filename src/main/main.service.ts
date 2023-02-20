import { singleton } from "tsyringe";
import {
  ParameterReaderAppService
} from "../app-service/parameter-reader-app.service";

@singleton()
/**
 * The main starting point for the program.
 */
export class MainService {
  constructor(
    private readonly parameterReaderApp: ParameterReaderAppService
  ) {
  }

  run(): void {
    this.parameterReaderApp.run();
  }
}
