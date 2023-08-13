import { singleton } from "tsyringe";
import type {
  HtmlJsonAttributeModel,
  HtmlJsonModel
} from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { TypeUtilsService } from "@lib/utils";
import { HtmlTypeEnum } from "../../enum/html-type.enum";

@singleton()
/**
 * The service is responsible for parse html json loops.
 */
export class HtmlJsonLoopParserService {
  constructor(private readonly typeUtils: TypeUtilsService) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.parseChild(html, {}))
      .flat();
  }

  private parseChild(
    htmlJson: HtmlJsonModel,
    loopHtmlAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel[] {
    const htmlJsonLoop = this.parseLoop(htmlJson, loopHtmlAttributes);
    return htmlJsonLoop.map(htmlJsonLoopItem => {
      return {
        ...htmlJsonLoopItem.htmlJson,
        children: htmlJsonLoopItem.htmlJson.children
          .map(child => this.parseChild(
            child, htmlJsonLoopItem.loopHtmlAttributes
          ))
          .flat()
      };
    });
  }

  private parseLoop(
    htmlJson: HtmlJsonModel,
    loopHtmlAttributes: HtmlJsonAttributeModel
  ): Array<{
      htmlJson: HtmlJsonModel;
      loopHtmlAttributes: HtmlJsonAttributeModel;
    }> {
    this.parseAttributes(htmlJson, loopHtmlAttributes);
    this.parseContent(htmlJson, loopHtmlAttributes);
    let loop = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataLoop
    ];
    if (loop === undefined) {
      return [{ htmlJson, loopHtmlAttributes }];
    }
    if (this.typeUtils.valueIsString(loop)) {
      loop = htmlJson.htmlAttributes[HtmlAttributesEnum.dataLoop];
    }
    return loop.map((loopItem: any) => ({
      htmlJson, loopHtmlAttributes: loopItem
    }));
  }

  private parseAttributes(
    htmlJson: HtmlJsonModel,
    loopHtmlAttributes: HtmlJsonAttributeModel
  ): void {
    if (htmlJson.htmlType === HtmlTypeEnum.tagContent) {
      return;
    }
    for (const loopHtmlAttribute in loopHtmlAttributes) {
      for (const htmlAttribute in htmlJson.htmlAttributes) {
        // eslint-disable-next-line no-useless-escape
        const pattern: string = `{{\s*${loopHtmlAttribute}\s*}}`;
        if (new RegExp(pattern, `g`).test(htmlJson.htmlAttributes[htmlAttribute])) {
          htmlJson.htmlAttributes[htmlAttribute] = loopHtmlAttributes[loopHtmlAttribute];
        }
      }
    }
  }

  private parseContent(
    htmlJson: HtmlJsonModel,
    loopHtmlAttributes: HtmlJsonAttributeModel
  ): void {
    if (htmlJson.htmlType !== HtmlTypeEnum.tagContent) {
      return;
    }
    for (const loopHtmlAttribute in loopHtmlAttributes) {
      // eslint-disable-next-line no-useless-escape
      const pattern: string = `{{\s*${loopHtmlAttribute}\s*}}`;
      htmlJson.htmlBase = htmlJson.htmlBase.replaceAll(
        new RegExp(pattern, `gm`),
        loopHtmlAttributes[loopHtmlAttribute]
      );
    }
  }
}
