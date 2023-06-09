import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { chdir } from "process";

@singleton()
/**
 * The service is responsible for go into given path.
 */
export class GoIntoService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  goInto(path: string): void {
    this.simpleMessage.writePlain(`Go into the ${path} path`, 0);
    chdir(path);
  }
}
