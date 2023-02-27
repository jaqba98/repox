import { singleton } from "tsyringe";
import {
  ReadParamAppService
} from "../app-service/read-param-app.service";
import {
  LogService
} from "../infrastructure/service/writer/log.service";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly readParamApp: ReadParamAppService,
    private readonly log: LogService
  ) {
  }

  run(): void {
    const params = this.readParamApp.read();
    this.log.json(params);
  }
}
