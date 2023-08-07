import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";

@singleton()
/**
 * The service is responsible for parse html json loops.
 */
export class HtmlJsonLoopParserService {
  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html)).flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonResult = this.parseLoop(htmlJson);
    return htmlJsonResult.map(result => ({
      ...result,
      children: result.children
        .map(child => this.parseChild(child)).flat()
    }));
  }

  private parseLoop(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const loop = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataLoop
    ];
    if (loop === undefined) return [htmlJson];
    return Array.from({ length: Number(loop) }, () => htmlJson);
  }
}
