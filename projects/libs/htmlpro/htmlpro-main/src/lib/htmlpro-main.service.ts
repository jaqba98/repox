import { container, singleton } from "tsyringe";

@singleton()
/**
 * The main service is responsible for run htmlpro program.
 */
export class HtmlproMainService {
  run(): void {
    console.log("Hello htmlpro");
  }
}

container.resolve(HtmlproMainService).run();
