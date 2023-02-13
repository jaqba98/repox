import { singleton } from "tsyringe";
import { LoggerModel } from "../../model/logger.model";
import { TextColorEnum } from "../../enum/text-color.enum";
import { LoggerModeEnum } from "../../enum/logger-mode.enum";

@singleton()
/**
 * The service responsible for displaying the prepared message
 * on the console screen in the appropriate mode.
 */
export class LoggerService {
  log(logger: LoggerModel): void {
    const { mode, message } = logger;
    const header = this.getLoggerHeader(mode);
    const color = this.getLoggerColor(mode);
    const outputMessage = this.buildLoggerOutputMessage(
      header,
      color,
      message
    );
    this.writeLoggerOutputMessage(outputMessage);
  }

  private getLoggerHeader(mode: LoggerModeEnum): string {
    const clearedMode = mode.toLowerCase();
    return clearedMode[0].toUpperCase() + clearedMode.slice(1);
  }

  private getLoggerColor(mode: LoggerModeEnum): TextColorEnum {
    switch (mode) {
      case LoggerModeEnum.error:
        return TextColorEnum.red;
      case LoggerModeEnum.success:
        return TextColorEnum.green;
      case LoggerModeEnum.warning:
        return TextColorEnum.yellow;
      case LoggerModeEnum.information:
        return TextColorEnum.cyan;
      default:
        throw new Error(`Not supported logger mode!`);
    }
  }

  private buildLoggerOutputMessage(
    header: string,
    color: TextColorEnum,
    message: string
  ): string {
    return `${color}${header}: ${message}${TextColorEnum.reset}`;
  }

  private writeLoggerOutputMessage(outputMessage: string): void {
    console.log(outputMessage);
  }
}
