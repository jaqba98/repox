import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";
import {
  BG_TEXT_GRAY,
  BG_TEXT_GREEN,
  BG_TEXT_MAGENTA,
  BG_TEXT_RED,
  BG_TEXT_YELLOW,
  FG_TEXT_GRAY,
  FG_TEXT_GREEN,
  FG_TEXT_MAGENTA,
  FG_TEXT_RED,
  FG_TEXT_YELLOW
} from "../../const/text-style.const";

@singleton()
/**
 * The converter service is responsible for
 * convert the logger mode to the color value representation.
 */
export class ConvertModeToColorService {
  convertToFg(loggerMode: LoggerModeEnum): string {
    switch (loggerMode) {
      case LoggerModeEnum.success:
        return FG_TEXT_GREEN;
      case LoggerModeEnum.error:
        return FG_TEXT_RED;
      case LoggerModeEnum.warning:
        return FG_TEXT_YELLOW;
      case LoggerModeEnum.info:
        return FG_TEXT_MAGENTA;
      case LoggerModeEnum.plain:
        return FG_TEXT_GRAY;
      default:
        throw new Error("The converter does not support the type!");
    }
  }

  convertToBg(loggerMode: LoggerModeEnum): string {
    switch (loggerMode) {
      case LoggerModeEnum.success:
        return BG_TEXT_GREEN;
      case LoggerModeEnum.error:
        return BG_TEXT_RED;
      case LoggerModeEnum.warning:
        return BG_TEXT_YELLOW;
      case LoggerModeEnum.info:
        return BG_TEXT_MAGENTA;
      case LoggerModeEnum.plain:
        return BG_TEXT_GRAY;
      default:
        throw new Error("The converter does not support the type!");
    }
  }
}
// todo: refactor
