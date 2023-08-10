import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { HtmlJsonAttributeModel } from "../../model/html-json.model";

@singleton()
/**
 * The service is responsible for parse html json loops.
 */
export class HtmlJsonLoopParserService {
  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html, {})).flat();
  }

  private parseChild(
    htmlJson: HtmlJsonModel, parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel[] {
    const htmlJsonResult = this.parseLoop(htmlJson, parentAttributes);
    return htmlJsonResult.map(result => ({
      ...result,
      children: result.children
        .map(child => this.parseChild(
          child, { ...parentAttributes, ...result.htmlAttributes }
        )).flat()
    }));
  }

  private parseLoop(
    htmlJson: HtmlJsonModel, parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel[] {
    let loop: any = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataLoop
    ];
    if (loop === undefined) return [htmlJson];
    for (const attribute in parentAttributes) {
      if (!new RegExp(`{{\\s*${attribute}\\s*}}`, `gm`).test(loop)) {
        continue;
      }
      loop = parentAttributes[attribute];
      break;
    }
    if (typeof loop === `string`) {
      const loopValues = JSON.parse(loop.replaceAll(`'`, `"`));
      if (!isNaN(Number(loopValues))) {
        return Array.from({ length: Number(loop) }, () => htmlJson);
      }
      if (typeof loopValues === `object`) {
        return loopValues
          .map((loopValue: any) => ({
            ...htmlJson,
            htmlAttributes: { ...htmlJson.htmlAttributes, ...loopValue }
          }));
      }
      return [];
    }
    if (typeof loop === `object`) {
      return loop
        .map((loopValue: any) => ({
          ...htmlJson,
          htmlAttributes: { ...htmlJson.htmlAttributes, ...loopValue }
        }));
    }
    return [];
  }
}
