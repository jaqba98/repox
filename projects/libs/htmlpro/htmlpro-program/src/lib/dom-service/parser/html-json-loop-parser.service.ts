import { singleton } from "tsyringe";
import type {
  HtmlJsonModel,
  HtmlJsonAttributeModel
} from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { TypeUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for parse html json loops.
 */
export class HtmlJsonLoopParserService {
  private loopHtmlAttributes: HtmlJsonAttributeModel = {};

  constructor(private readonly typeUtils: TypeUtilsService) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.parseChild(html))
      .flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonLoop = this.parseLoop(htmlJson);
    return htmlJsonLoop.map(htmlJsonImportLoop => ({
      ...htmlJsonImportLoop,
      children: htmlJsonImportLoop.children
        .map(child => this.parseChild(child))
        .flat()
    }));
  }

  private parseLoop(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const loop = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataLoop
    ];
    if (loop === undefined) return [htmlJson];
    if (this.typeUtils.valueIsString(loop)) {
      throw new Error(`Dupa`);
    }
    return loop.map((loopItem: any) => {
      this.loopHtmlAttributes = loopItem;
      return {
        ...htmlJson,
        htmlAttributes: {
          ...htmlJson.htmlAttributes,
          ...loopItem
        }
      };
    });
  }
}
