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
 * The service is responsible for parse html json file.
 */
export class HtmlJsonParserService {
  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlConverter: HtmlToJsonConverterService
  ) {
  }

  parse(htmlJson: HtmlJsonModel[]): HtmlJsonModel[] {
    return htmlJson
      .map(html => this.processChild(html));
  }

  private processChild(htmlJson: HtmlJsonModel): HtmlJsonModel {
    const processImport: HtmlJsonModel = this.processImport(htmlJson);
    return {
      ...processImport,
      children: htmlJson.children
        .map(nextChild => this.processChild(nextChild))
    };
  }

  private processImport(htmlJson: HtmlJsonModel): HtmlJsonModel {
    const alias = htmlJson.htmlAttributes[HtmlAttributesEnum.dataImport];
    if (alias === undefined) {
      return htmlJson;
    }
    const component = this.htmlProDomainStore.getComponent(alias);
    const htmlContent = this.fileUtils.readHtmlFile(component.templateUrl);
    return this.htmlConverter.htmlToJson(htmlContent)[0];
  }
}
