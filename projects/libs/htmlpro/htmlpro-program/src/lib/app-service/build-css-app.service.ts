import { singleton } from "tsyringe";
import { FileUtilsService } from "@lib/utils";
import {
  HtmlToJsonConverterService
} from "../dom-service/converter/html-to-json-converter.service";
import {
  HtmlJsonAliasParserService
} from "../dom-service/parser/html-json-alias-parser.service";
import {
  HtmlJsonImportParserService
} from "../dom-service/parser/html-json-import-parser.service";
import {
  AliasToCssParserService
} from "../dom-service/parser/alias-to-css-parser.service";

@singleton()
/**
 * The app service is responsible for build css file.
 */
export class BuildCssAppService {
  constructor(
    private readonly fileUtils: FileUtilsService,
    private readonly htmlToJson: HtmlToJsonConverterService,
    private readonly htmlJsonImport: HtmlJsonImportParserService,
    private readonly aliasParser: HtmlJsonAliasParserService,
    private readonly aliasToCssParser: AliasToCssParserService
  ) {
  }

  run(
    inputPath: string, outputPath: string
  ): boolean {
    const htmlFiles = this.fileUtils.readAllHtmlFiles(inputPath)
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
        parsedHtmlJson: this.htmlJsonImport.parse(html.htmlJson)
      }))
      .map(html => ({
        ...html,
        aliases: this.aliasParser.parse(html.parsedHtmlJson)
      }));
    const styles = htmlFiles
      .map(htmlFile => htmlFile.aliases)
      .flat()
      .reduce((acc: string[], curr: string): string[] =>
        acc.includes(curr) ? acc : [...acc, curr], []
      )
      .map(cssFile => this.aliasToCssParser.parse(cssFile));
    console.log(styles);
    return true;
  }
}
