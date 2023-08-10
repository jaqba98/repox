import { singleton } from "tsyringe";
import type {
  HtmlJsonAttributeModel,
  HtmlJsonModel
} from "../../model/html-json.model";
import {
  HtmlToJsonConverterService
} from "../converter/html-to-json-converter.service";

@singleton()
/**
 * The service is responsible for parse html json values.
 */
export class HtmlJsonValueParserService {
  constructor(
    private readonly htmlConverter: HtmlToJsonConverterService
  ) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html, {}));
  }

  private parseChild(
    htmlJson: HtmlJsonModel, parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel {
    const newParentAttributes = {
      ...parentAttributes, ...htmlJson.htmlAttributes
    };
    const htmlJsonResult = this.parseValue(
      htmlJson, newParentAttributes
    );
    return {
      ...htmlJsonResult,
      children: htmlJsonResult.children
        .map(child => this.parseChild(child, newParentAttributes))
    };
  }

  private parseValue(
    htmlJson: HtmlJsonModel,
    parentAttributes: HtmlJsonAttributeModel
  ): HtmlJsonModel {
    for (const attribute in parentAttributes) {
      htmlJson.htmlBase = htmlJson.htmlBase.replaceAll(
        new RegExp(`{{\\s*${attribute}\\s*}}`, `gm`),
        htmlJson.htmlAttributes[attribute]
      );
    }
    return htmlJson;
  }
}
