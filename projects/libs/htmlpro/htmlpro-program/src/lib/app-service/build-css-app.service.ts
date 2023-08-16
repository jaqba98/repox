import { singleton } from "tsyringe";
import {
  FileUtilsService,
  FolderUtilsService,
  PathUtilsService
} from "@lib/utils";
import {
  HtmlToJsonConverterService
} from "../dom-service/converter/html-to-json-converter.service";
import {
  CleanHtmlContentService
} from "../dom-service/service/clean-html-content.service";
import cloneDeep from "lodash/cloneDeep";
import {
  HtmlJsonAliasListParserService
} from "../dom-service/parser/html-json-alias-list-parser.service";
import { HtmlProDomainStoreService } from "@lib/htmlpro-workspace";
import { NEW_LINE } from "@lib/const";

@singleton()
/**
 * The app service is responsible for build css file.
 */
export class BuildCssAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly cleanHtmlContent: CleanHtmlContentService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly aliasList: HtmlJsonAliasListParserService,
    private readonly domainStore: HtmlProDomainStoreService,
    private readonly pathUtils: PathUtilsService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const cssResult = this.fileUtils.readAllHtmlFiles(inputPath)
      .map(htmlFilePath => ({ htmlFilePath }))
      .map(html => ({
        ...html,
        htmlFileBaseContent: this.fileUtils.readTextFile(
          html.htmlFilePath
        )
      }))
      .map(html => ({
        ...html,
        htmlFileCleanedContent: this.cleanHtmlContent.clean(
          html.htmlFileBaseContent
        )
      }))
      .map(html => ({
        ...html,
        htmlJson: this.htmlToJson.parse(html.htmlFileCleanedContent)
      }))
      .map(html => ({
        ...html,
        htmlJsonAliasList: this.aliasList.parse(
          cloneDeep(html.htmlJson)
        )
      }))
      .map(html => ({
        ...html,
        componentStyles: html.htmlJsonAliasList
          .map(alias => this.domainStore.getComponent(alias).styleUrls)
          .flat()
          .map(styleUrl => this.fileUtils.readTextFile(styleUrl))
      }));
    const componentStyles = cssResult
      .map(css => css.componentStyles)
      .flat()
      .reduce((acc: string[], curr: string): string[] => {
        if (acc.includes(curr)) {
          return acc;
        }
        return [...acc, curr];
      }, [])
      .join(NEW_LINE);
    const applicationStyles = this.fileUtils.readAllCssFiles(inputPath)
      .map(cssFile => this.fileUtils.readTextFile(cssFile))
      .join(NEW_LINE);
    this.fileUtils.writeTextFile(
      this.pathUtils.createPath([outputPath, `style.css`]),
      applicationStyles.concat(componentStyles)
    );
    return true;
  }
}
