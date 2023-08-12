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
  HtmlJsonImportParserService
} from "../dom-service/parser/html-json-import-parser.service";
import {
  HtmlJsonLoopParserService
} from "../dom-service/parser/html-json-loop-parser.service";
import {
  JsonToHtmlConverterService
} from "../dom-service/converter/json-to-html-converter.service";
import {
  HtmlJsonValueParserService
} from "../dom-service/parser/html-json-value-parser.service";
import {
  HtmlJsonCorrectTypeParserService
} from "../dom-service/parser/html-json-correct-type-parser.service";
import cloneDeep from "lodash/cloneDeep";
import { clone } from "lodash";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly importParser: HtmlJsonImportParserService,
    private readonly correctType: HtmlJsonCorrectTypeParserService,
    private readonly loopParser: HtmlJsonLoopParserService,
    private readonly pathUtils: PathUtilsService,
    private readonly jsonToHtml: JsonToHtmlConverterService,
    private readonly valueParser: HtmlJsonValueParserService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    // todo: Fix the method
    this.folderUtils.createFolder(outputPath);
    const result = this.fileUtils.readAllHtmlFiles(inputPath)
      .map(htmlFilePath => ({ htmlFilePath }))
      .map(html => ({
        ...html,
        htmlFileRead: this.fileUtils.readHtmlFile(cloneDeep(html.htmlFilePath))
      }))
      .map(html => ({
        ...html,
        htmlJson: this.htmlToJson.htmlToJson(cloneDeep(html.htmlFileRead))
      }))
      .map(html => ({
        ...html,
        htmlJsonImport: this.importParser.parse(cloneDeep(html.htmlJson))
      }))
      .map(html => ({
        ...html,
        htmlJsonCorrectType: this.correctType.parse(cloneDeep(html.htmlJsonImport))
      }))
      .map(html => ({
        ...html,
        htmlJsonLoop: this.loopParser.parse(cloneDeep(html.htmlJsonCorrectType))
      }));
    console.log(result);
    // .map(html => ({
    //   ...html,
    //   htmlJsonParsed: this.valueParser.parse(html.htmlJsonParsed)
    // }))
    // .map(html => ({
    //   ...html,
    //   htmlToSave: this.jsonToHtml.jsonToHtml(html.htmlJsonParsed)
    // }))
    // .map(html => ({
    //   ...html,
    //   htmlFileName: this.fileUtils.getFileName(html.htmlPath)
    // }))
    // .map(html => ({
    //   ...html,
    //   htmlOutput: this.pathUtils.createPath(
    //     [outputPath, html.htmlFileName]
    //   )
    // }));
    // result.forEach(html => {
    //   this.fileUtils.writeTextFile(html.htmlOutput, html.htmlToSave);
    // });
    return true;
  }
}
