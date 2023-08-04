import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "@lib/utils";

@singleton()
/**
 * The service is responsible for process html file.
 */
export class ProcessHtmlJsonService {
  process(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson;
  }
}
