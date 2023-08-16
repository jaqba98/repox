import { singleton } from "tsyringe";
import { TypeUtilsService } from "@lib/utils";
import type { HtmlJsonModel } from "../../model/html-json.model";
import cloneDeep from "lodash/cloneDeep";

@singleton()
/**
 * The service is responsible for parse html arguments
 * to the correct type.
 */
export class HtmlJsonCorrectTypeParserService {
  constructor(private readonly typeUtils: TypeUtilsService) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.parseChild(cloneDeep(html)))
      .flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonCorrectType = this.parseCorrectType(htmlJson);
    return htmlJsonCorrectType.map(htmlJsonCorrectTypeResult => ({
      ...htmlJsonCorrectTypeResult,
      children: htmlJsonCorrectTypeResult.children.map(
        child => this.parseChild(cloneDeep(child))
      ).flat()
    }));
  }

  private parseCorrectType(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    for (const attribute in htmlJson.htmlAttributes) {
      htmlJson.htmlAttributes[attribute] = this.parseValue(
        htmlJson.htmlAttributes[attribute]
      );
    }
    return [htmlJson];
  }

  private parseValue(baseValue: any): any {
    // Parse to boolean
    if (typeof baseValue === `boolean`) {
      return Boolean(baseValue);
    }
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
