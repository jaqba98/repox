import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";

@singleton()
/**
 * The service is responsible for process html file.
 */
export class ProcessHtmlJsonService {
  process(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.processChild(html));
  }

  private processChild(htmlJson: HtmlJsonModel): HtmlJsonModel {
    return {
      ...htmlJson,
      children: htmlJson.children
        .map(nextChild => this.processChild(nextChild))
    };
  }
}
