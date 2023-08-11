import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { TypeUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for parse html arguments
 * to the correct type.
 */
export class HtmlJsonCorrectTypeParserService {
  constructor(private readonly typeUtils: TypeUtilsService) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html)).flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonCorrectType = this.parseCorrectType(htmlJson);
    return htmlJsonCorrectType.map(htmlJsonCorrectTypeResult => ({
      ...htmlJsonCorrectTypeResult,
      children: htmlJsonCorrectTypeResult.children.map(
        child => this.parseChild(child)
      ).flat()
    }));
  }

  private parseCorrectType(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    // Process htmlAttributes
    for (const attribute in htmlJson.htmlAttributes) {
      htmlJson.htmlAttributes[attribute] = this.parseValue(
        htmlJson.htmlAttributes[attribute]
      );
    }
    // Process htmlAttributes
    for (const importAttribute in htmlJson.importHtmlAttributes) {
      htmlJson.importHtmlAttributes[importAttribute] = this.parseValue(
        htmlJson.importHtmlAttributes[importAttribute]
      );
    }
    return [htmlJson];
  }

  private parseValue(baseValue: string): any {
    // Parse to object
    const parsedValue = baseValue.replaceAll(`'`, `"`);
    if (this.typeUtils.valueIsObject(parsedValue)) {
      return JSON.parse(parsedValue);
    }
    // Parse to number
    if (this.typeUtils.valueIsNumber(parsedValue)) {
      return Number(baseValue);
    }
    // Parse to string
    return baseValue.toString();
  }
}
