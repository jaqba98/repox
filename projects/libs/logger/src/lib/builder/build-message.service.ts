import { singleton } from "tsyringe";

import {
  NEW_LINE,
  EMPTY_STRING,
  SPACE
} from "@lib/core";
import {
  LoggerDomainModel,
  LoggerLineModel,
  LoggerWordModel
} from "../model/logger-domain.model";
import {
  buildLogo,
  buildEmptyMessage,
  buildHeader,
  buildNewLine,
  buildLine,
  buildUnderscoreWord,
  buildWord
} from "./build-message-piece.service";
import { StatusToColorService } from "../converter/status-to-color.service";

@singleton()
export class BuildMessageService {
  constructor(private readonly statusToColor: StatusToColorService) {
  }

  build(domain: LoggerDomainModel) {
    return domain.lines
      .map(line => this.buildLine(line))
      .join(NEW_LINE);
  }

  private buildLine(line: LoggerLineModel) {
    const { status, logo, header, words, newline } = line;
    const fgColor = this.statusToColor.convertToFg(status);
    const bgColor = this.statusToColor.convertToBg(status);
    const logoContent = logo.visible
      ? buildLogo(bgColor, logo.content)
      : buildEmptyMessage();
    const headerContent = header.visible
      ? buildHeader(bgColor, header.content)
      : buildEmptyMessage();
    const message = this.buildMessage(fgColor, words);
    const newlines = buildNewLine(newline);
    const result = [logoContent, headerContent, message, newlines]
      .filter(entity => entity !== EMPTY_STRING)
      .join(SPACE);
    return buildLine(result);
  }

  private buildMessage(
    fgColor: string,
    words: LoggerLineModel["words"]
  ) {
    return words
      .map(word => this.buildMessageWord(fgColor, word))
      .join(SPACE);
  }

  private buildMessageWord(fgColor: string, word: LoggerWordModel) {
    const { content, underscore, visible } = word;
    if (!visible) return buildEmptyMessage();
    return underscore
      ? buildUnderscoreWord(fgColor, content)
      : buildWord(fgColor, content);
  }
}
