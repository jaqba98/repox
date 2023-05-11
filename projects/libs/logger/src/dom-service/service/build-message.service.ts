import { singleton } from "tsyringe";
import {
  LoggerDomainModel,
  LoggerLineMessageModel,
  LoggerLineModel
} from "../../model/logger-domain.model";
import {
  emptyString,
  newline,
  space
} from "../../const/symbol.const";
import {
  ConvertModeToColorService
} from "../converter/convert-mode-to-color.service";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import {
  buildEmptyMessage,
  buildHeader,
  buildLine,
  buildLogo,
  buildMessage,
  buildWord
} from "../builder/builder-message";

@singleton()
/**
 * The service is responsible for building message
 * ready to be displayed on the console screen.
 */
export class BuildMessageService {
  constructor(
    private readonly convertModeToColor: ConvertModeToColorService
  ) {
  }

  build(model: LoggerDomainModel): string {
    return model.lines
      .map(line => this.buildLine(line))
      .join(newline);
  }

  private buildLine(line: LoggerLineModel): string {
    const { isLogo, isHeader, headerContent, message } = line;
    const mode: LoggerModeEnum = <LoggerModeEnum>line.mode;
    const fgColor: string = this.convertModeToColor.convertToFg(mode);
    const bgColor: string = this.convertModeToColor.convertToBg(mode);
    const logo: string = this.buildLogo(isLogo, bgColor);
    const header: string = this.buildHeader(
      isHeader,
      bgColor,
      headerContent
    );
    const msg: string = this.buildMessage(message, fgColor);
    const newline: string = this.buildNewLine(line.newline);
    return [logo, header, msg, newline]
      .filter(entity => entity !== emptyString)
      .map(entity => buildLine(entity))
      .join(space);
  }

  private buildLogo(isLogo: boolean, bgColor: string): string {
    return isLogo ? buildLogo(bgColor) : buildEmptyMessage();
  }

  private buildHeader(
    isHeader: boolean,
    bgColor: string,
    headerContent: string
  ): string {
    return isHeader ?
      buildHeader(bgColor, headerContent) :
      buildEmptyMessage();
  }

  private buildMessage(
    message: string | Array<LoggerLineMessageModel>,
    fgColor: string
  ): string {
    if (typeof message === "string") {
      return buildMessage(fgColor, message);
    }
    return message
      .map(word => this.buildWord(fgColor, word))
      .map(word => buildLine(word))
      .join(space);
  }

  private buildWord(
    fgColor: string,
    word: LoggerLineMessageModel
  ): string {
    const { value, underscore } = word;
    return buildWord(fgColor, value, underscore);
  }

  private buildNewLine(quantityNewline: number): string {
    return newline.repeat(quantityNewline);
  }
}
