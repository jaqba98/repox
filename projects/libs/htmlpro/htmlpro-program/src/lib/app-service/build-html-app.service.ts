import { singleton } from "tsyringe";
import { FileUtilsService, FolderUtilsService } from "@lib/utils";
import {
  HtmlToJsonConverterService
} from "../dom-service/converter/html-to-json-converter.service";
import {
  HtmlJsonImportParserService
} from "../dom-service/parser/html-json-import-parser.service";
import {
  HtmlJsonLoopParserService
} from "../dom-service/parser/html-json-loop-parser.service";
import {
  JsonToHtmlConverterService
} from "../dom-service/converter/json-to-html-converter.service";
import {
  HtmlJsonCorrectTypeParserService
} from "../dom-service/parser/html-json-correct-type-parser.service";
import {
  CleanHtmlContentService
} from "../dom-service/service/clean-html-content.service";
import cloneDeep from "lodash/cloneDeep";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly cleanHtmlContent: CleanHtmlContentService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly importParser: HtmlJsonImportParserService,
    private readonly correctType: HtmlJsonCorrectTypeParserService,
    private readonly loopParser: HtmlJsonLoopParserService,
    private readonly jsonToHtml: JsonToHtmlConverterService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const result = this.fileUtils.readAllHtmlFiles(inputPath)
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
        htmlJsonImport: this.importParser.parse(
          cloneDeep(html.htmlJson)
        )
      }))
      .map(html => ({
        ...html,
        htmlJsonCorrectType: this.correctType.parse(
          cloneDeep(html.htmlJsonImport)
        )
      }))
      .map(html => ({
        ...html,
        htmlJsonLoop: this.loopParser.parse(
          cloneDeep(html.htmlJsonCorrectType)
        )
      }))
      .map(html => ({
        ...html,
        htmlToSave: this.jsonToHtml.parse(
          cloneDeep(html.htmlJsonLoop)
        )
      }))
      .map(html => ({
        ...html,
        htmlFileName: this.fileUtils.getFileName(html.htmlFilePath)
      }));
    // .map(html => ({
    //   ...html,
    //   htmlOutput: this.pathUtils.createPath(
    //     [outputPath, html.htmlFileName]
    //   )
    // }));
    // result.forEach(html => {
    //   this.fileUtils.writeTextFile(html.htmlOutput, html.htmlToSave);
    // });
    console.log(result);
    return true;
  }
}
