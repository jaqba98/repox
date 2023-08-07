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
  HtmlJsonCssDepParserService
} from "../dom-service/parser/html-json-css-dep-parser.service";
import {
  CssDepToStyleParserService
} from "../dom-service/parser/css-dep-to-style-parser.service";
import { EMPTY_STRING } from "@lib/const";

@singleton()
/**
 * The app service is responsible for build html file.
 */
export class BuildHtmlAppService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly fileUtils: FileUtilsService,
    private readonly pathUtils: PathUtilsService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly importParser: HtmlJsonImportParserService,
    private readonly loopParser: HtmlJsonLoopParserService,
    private readonly jsonToHtml: JsonToHtmlConverterService,
    private readonly cssDepParser: HtmlJsonCssDepParserService,
    private readonly cssDepToStyleParser: CssDepToStyleParserService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    this.folderUtils.createFolder(outputPath);
    const result = this.fileUtils.readAllHtmlFiles(inputPath)
      .map(htmlPath => ({ htmlPath }))
      .map(html => ({
        ...html,
        htmlBase: this.fileUtils.readHtmlFile(html.htmlPath)
      }))
      .map(html => ({
        ...html,
        htmlJson: this.htmlToJson.htmlToJson(html.htmlBase)
      }))
      .map(html => ({
        ...html,
        htmlJsonParsed: this.importParser.parse(html.htmlJson)
      }))
      .map(html => ({
        ...html,
        htmlJsonParsed: this.loopParser.parse(html.htmlJsonParsed)
      }))
      .map(html => ({
        ...html,
        htmlToSave: this.jsonToHtml.jsonToHtml(html.htmlJsonParsed)
      }))
      .map(html => ({
        ...html,
        htmlFileName: this.fileUtils.getFileName(html.htmlPath)
      }))
      .map(html => ({
        ...html,
        htmlOutput: this.pathUtils.createPath(
          [outputPath, html.htmlFileName]
        )
      }))
      .map(html => ({
        ...html,
        cssDependencies: this.cssDepParser.parse(html.htmlJson)
      }));
    // Build all html files
    result.forEach(html => {
      this.fileUtils.writeTextFile(html.htmlOutput, html.htmlToSave);
    });
    // Build css file
    const cssFromProject = this.fileUtils.readAllCssFiles(inputPath)
      .map(cssFile => this.fileUtils.readTextFile(cssFile))
      .join(EMPTY_STRING);
    const cssFromComponents = result
      .map(html => html.cssDependencies)
      .flat()
      .reduce((acc: string[], current: string) => {
        if (!acc.includes(current)) {
          acc.push(current);
        }
        return acc;
      }, []);
    const cssResult = cssFromProject
      .concat(this.cssDepToStyleParser.parse(cssFromComponents));
    this.fileUtils.writeTextFile(
      this.pathUtils.createPath([outputPath, `style.css`]),
      cssResult
    );
    return true;
  }
}
