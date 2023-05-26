import { singleton } from "tsyringe";
import {
  ConvertModeToColorService
} from "../converter/convert-mode-to-color.service";
import {
  LoggerDomainModel,
  LoggerLineMessageModel,
  LoggerLineModel
} from "../../model/logger-domain.model";
import {
  EMPTY_STRING,
  NEW_LINE,
  SPACE
} from "../../const/symbol.const";
import {
  buildCleanWord,
  buildEmptyMessage,
  buildHeader,
  buildLine,
  buildLogo,
  buildNewLine,
  buildUnderscoreWord
} from "./build-message-piece.service";

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
      .join(NEW_LINE);
  }

  private buildLine(line: LoggerLineModel): string {
    const { mode, isLogo, isHeader, headerContent, message } = line;
    const fgColor: string = this.convertModeToColor.convertToFg(mode);
    const bgColor: string = this.convertModeToColor.convertToBg(mode);
    const logo: string = isLogo ?
      buildLogo(bgColor) :
      buildEmptyMessage();
    const header: string = isHeader ?
      buildHeader(bgColor, headerContent) :
      buildEmptyMessage();
    const fullMessage: string = this.buildMessage(message, fgColor);
    const newline: string = buildNewLine(line.newline);
    return [logo, header, fullMessage, newline]
      .filter(entity => entity !== EMPTY_STRING)
      .map(entity => buildLine(entity))
      .join(SPACE);
  }

  private buildMessage(
    message: LoggerLineModel["message"],
    fgColor: string
  ): string {
    return message
      .map(entity => this.buildMessageEntity(entity, fgColor))
      .map(entity => buildLine(entity))
      .join(SPACE);
  }

  private buildMessageEntity(
    entity: LoggerLineMessageModel,
    fgColor: string
  ): string {
    const { value, underscore } = entity;
    return underscore ?
      buildUnderscoreWord(fgColor, value) :
      buildCleanWord(fgColor, value);
  }
}
