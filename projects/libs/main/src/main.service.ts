import "core-js/features/reflect";
import { container, singleton } from "tsyringe";
import { BuildParamDomainAppService } from "@lib/param-domain";

@singleton()
/**
 * Main launch point of the program.
 */
export class MainService {
  constructor(
    private readonly buildParamDomain: BuildParamDomainAppService
  ) {
  }
  run(): void {
    this.buildParamDomain.build();
  }
}

container.resolve(MainService).run();
