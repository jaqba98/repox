import { singleton } from "tsyringe";
import type {
  HtmlJsonAttributeModel,
  HtmlJsonModel
} from "../../model/html-json.model";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import { FileUtilsService } from "@lib/utils";
import {
  HtmlToJsonConverterService
} from "../converter/html-to-json-converter.service";
import { HtmlTypeEnum } from "../../enum/html-type.enum";

@singleton()
/**
 * The service is responsible for parse html json imports.
 */
export class HtmlJsonImportParserService {
  private importHtmlAttributes: HtmlJsonAttributeModel = {};

  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlToJsonConverterService
  ) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.parseChild(html))
      .flat();
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonImport = this.parseImport(htmlJson);
    return htmlJsonImport.map(htmlJsonImportResult => ({
      ...htmlJsonImportResult,
      children: htmlJsonImportResult.children
        .map(child => this.parseChild(child))
        .flat()
    }));
  }

  private parseImport(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    this.parseAttributes(htmlJson);
    this.parseContent(htmlJson);
    const alias = htmlJson.htmlAttributes[
      HtmlAttributesEnum.dataImport
    ];
    if (alias === undefined) return [htmlJson];
    this.importHtmlAttributes = htmlJson.htmlAttributes;
    const component = this.htmlProDomainStore.getComponent(alias);
    const htmlFileContent = this.fileUtils.readHtmlFile(
      component.templateUrl
    );
    return this.htmlConverter.htmlToJson(htmlFileContent);
  }

  private parseAttributes(htmlJson: HtmlJsonModel): void {
    if (htmlJson.htmlType === HtmlTypeEnum.tagContent) {
      return;
    }
    for (const importHtmlAttribute in this.importHtmlAttributes) {
      for (const htmlAttribute in htmlJson.htmlAttributes) {
        // eslint-disable-next-line no-useless-escape
        const pattern: string = `{{\s*${importHtmlAttribute}\s*}}`;
        if (new RegExp(pattern, `g`).test(htmlJson.htmlAttributes[htmlAttribute])) {
          htmlJson.htmlAttributes[htmlAttribute] = this.importHtmlAttributes[importHtmlAttribute];
        }
      }
    }
  }

  private parseContent(htmlJson: HtmlJsonModel): void {
    if (htmlJson.htmlType !== HtmlTypeEnum.tagContent) {
      return;
    }
    for (const importHtmlAttribute in this.importHtmlAttributes) {
      // eslint-disable-next-line no-useless-escape
      const pattern: string = `{{\s*${importHtmlAttribute}\s*}}`;
      htmlJson.htmlBase = htmlJson.htmlBase.replaceAll(
        new RegExp(pattern, `gm`),
        this.importHtmlAttributes[importHtmlAttribute]
      );
    }
  }
}
