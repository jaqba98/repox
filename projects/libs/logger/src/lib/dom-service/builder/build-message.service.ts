import {singleton} from "tsyringe";

import {ConvertModeToColorService} from "../converter/convert-mode-to-color.service";
import {
    LoggerDomainModel,
    LoggerLineModel,
    LoggerWordModel
} from "../../model/logger-domain.model";
import {EMPTY_STRING, NEW_LINE, SPACE} from "@lib/const";
import {
    buildEmptyMessage,
    buildHeader,
    buildLine,
    buildLogo,
    buildNewLine,
    buildUnderscoreWord,
    buildWord
} from "./build-message-piece.service";

@singleton()
/**
 * The service is responsible for building message
 * ready to be displayed on the console screen.
 */
export class BuildMessageService {
    constructor(private readonly convertModeToColor: ConvertModeToColorService) {
    }

    build(loggerDomain: LoggerDomainModel): string {
        return loggerDomain.lines
            .map(line => this.buildLine(line))
            .join(NEW_LINE);
    }

    private buildLine(loggerLine: LoggerLineModel): string {
        const {mode, logo, header, words} = loggerLine;
        const fgColor = this.convertModeToColor.convertToFg(mode);
        const bgColor = this.convertModeToColor.convertToBg(mode);
        const logoContent = logo.visible
            ? buildLogo(bgColor, logo.content)
            : buildEmptyMessage();
        const headerContent = header.visible
            ? buildHeader(bgColor, header.content)
            : buildEmptyMessage();
        const message = this.buildMessage(words, fgColor);
        const newline = buildNewLine(loggerLine.newline);
        return [logoContent, headerContent, message, newline]
            .filter(entity => entity !== EMPTY_STRING)
            .map(entity => buildLine(entity))
            .join(SPACE);
    }

    private buildMessage(words: LoggerLineModel["words"], fgColor: string): string {
        return words
            .map(word => this.buildMessageWord(word, fgColor))
            .map(word => buildLine(word))
            .join(SPACE);
    }

    private buildMessageWord(word: LoggerWordModel, fgColor: string): string {
        const {content, underscore} = word;
        return underscore
            ? buildUnderscoreWord(fgColor, content)
            : buildWord(fgColor, content);
    }
}
