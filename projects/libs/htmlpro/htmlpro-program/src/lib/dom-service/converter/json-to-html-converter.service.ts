import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlTypeEnum } from "../../enum/html-type.enum";

@singleton()
/**
 * The service is responsible for convert json to html.
 */
export class JsonToHtmlConverterService {
  parse(htmlJson: HtmlJsonModel[]): string {
    return htmlJson
      .map(html => this.parseChild(html))
      .join(``);
  }

  private parseChild(htmlJson: HtmlJsonModel): string {
    return this.parseHtmlJson(htmlJson);
  }

  private parseHtmlJson(htmlJson: HtmlJsonModel): string {
    if (htmlJson.htmlType === HtmlTypeEnum.tagContent) {
      return htmlJson.htmlBase;
    }
    let result: string = ``;
    // Build open tag
    result += `<${htmlJson.htmlName}`;
    for (const attr in htmlJson.htmlAttributes) {
      if (htmlJson.htmlBase.includes(attr)) {
        if (typeof htmlJson.htmlAttributes[attr] === `boolean`) {
          result += ` ${attr}`;
        } else {
          result += ` ${attr}="${htmlJson.htmlAttributes[attr]}"`;
        }
      }
    }
    result += `>`;
    // Build children
    result += htmlJson.children
      .map(child => this.parseChild(child))
      .join(``);
    // Build close tag
    if (htmlJson.htmlSelfClose) return result;
    result += `</${htmlJson.htmlName}>`;
    return result;
  }
}
