import { singleton } from "tsyringe";
import type {
  HtmlJsonAttributeModel,
  HtmlJsonModel
} from "../../model/html-json.model";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import {
  HtmlToJsonConverterService
} from "../converter/html-to-json-converter.service";
import { HtmlAttributesEnum } from "../../enum/html-attributes.enum";
import cloneDeep from "lodash/cloneDeep";
import { FileUtilsService } from "@lib/utils";
import {
  CleanHtmlContentService
} from "../service/clean-html-content.service";

@singleton()
/**
 * The service is responsible for parse html json alias list.
 */
export class HtmlJsonAliasListParserService {
  private readonly aliases: string[] = [];

  constructor(
    private readonly htmlProDomainStore: HtmlProDomainStoreService,
    private readonly cleanHtmlContent: CleanHtmlContentService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly fileUtils: FileUtilsService
  ) {
  }

  parse(htmlJson: HtmlJsonModel[]): string[] {
    htmlJson
      .map(html => this.parseChild(cloneDeep(html)))
      .flat();
    return this.aliases
      .reduce((acc: string[], curr: string): string[] => {
        if (acc.includes(curr)) return acc;
        return [...acc, curr];
      }, []);
  }

  private parseChild(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const htmlJsonAliasList = this.parseAliasList(htmlJson);
    return htmlJsonAliasList.map(htmlJsonAliasListResult => ({
      ...htmlJsonAliasListResult,
      children: htmlJsonAliasListResult.children
        .map(child => this.parseChild(cloneDeep(child)))
        .flat()
    }));
  }

  private parseAliasList(htmlJson: HtmlJsonModel): HtmlJsonModel[] {
    const alias = htmlJson
      .htmlAttributes[HtmlAttributesEnum.dataImport];
    if (alias === undefined) return [htmlJson];
    this.aliases.push(alias);
    const component = this.htmlProDomainStore.getComponent(alias);
    const htmlFileContent = this.fileUtils.readTextFile(
      component.templateUrl
    );
    return this.htmlToJson.parse(
      this.cleanHtmlContent.clean(htmlFileContent)
    );
  }
}
