import { singleton } from "tsyringe";
import { chdir } from "process";
import { SimpleMessageAppService } from "@lib/logger";

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
    this.simpleMessage.writePlain(`Go into the ${path}`, 0);
    chdir(path);
  }
}
// todo: refactor