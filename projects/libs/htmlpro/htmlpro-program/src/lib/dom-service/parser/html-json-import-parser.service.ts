import { singleton } from "tsyringe";
import type { HtmlJsonModel } from "../../model/html-json.model";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { FileUtilsService } from "@lib/utils";
import {
  HtmlToJsonConverterService
} from "../converter/html-to-json-converter.service";

@singleton()
/**
 * The service is responsible for parse html json imports.
 */
export class HtmlJsonImportParserService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlToJsonConverterService
  ) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson.map(html => this.parseChild(html));
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel {
    const htmlJsonResult = this.parseImport(htmlJson);
    htmlJsonResult.htmlAttributes = {
      ...htmlJsonResult.htmlAttributes,
      ...htmlJson.htmlAttributes
    };
    return {
      ...htmlJsonResult,
      children: htmlJsonResult.children
        .map(child => this.parseChild(child))
    };
  }

  private parseImport(htmlJson: HtmlJsonModel): HtmlJsonModel {
    const alias = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataImport
    ];
    if (alias === undefined) return htmlJson;
    const component = this.htmlProDomainStore.getComponent(alias);
    let htmlContent = this.fileUtils.readHtmlFile(
      component.templateUrl
    );
    for (const attribute in htmlJson.htmlAttributes) {
      htmlContent = htmlContent.replaceAll(
        new RegExp(`{{\\s*${attribute}\\s*}}`, `gm`),
        htmlJson.htmlAttributes[attribute]
      );
    }
    return this.htmlConverter.htmlToJson(htmlContent)[0];
  }
}
