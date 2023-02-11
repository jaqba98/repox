import { EOL } from "os";
import { singleton } from "tsyringe";
import { LoggerModeEnum } from "../enum/logger-mode.enum";
import { TextColorEnum } from "../enum/text-color.enum";
import { LoggerModel } from "../model/logger.model";

@singleton()
export class LoggerService {
  log(loggerData: LoggerModel): void {
    const { mode, message, newLine } = loggerData;
    const header = this.getLoggerHeader(mode);
    const color = this.getLoggerColor(mode);
    const result = this.buildMessage(header, color, message, newLine);
    console.log(result);
  }

  private getLoggerHeader(mode: LoggerModeEnum): string {
    const cleanMode = mode.toLowerCase();
    return cleanMode.charAt(0).toUpperCase() + cleanMode.slice(1);
  }

  private getLoggerColor(mode: LoggerModeEnum): TextColorEnum {
    if (mode === LoggerModeEnum.information) return TextColorEnum.cyan;
    if (mode === LoggerModeEnum.error) return TextColorEnum.red;
    if (mode === LoggerModeEnum.warning) return TextColorEnum.yellow;
    if (mode === LoggerModeEnum.success) return TextColorEnum.green;
    return TextColorEnum.reset;
  }

  private buildMessage(
    header: string,
    color: TextColorEnum,
    message: string,
    newLine: boolean
  ): string {
    const colon = newLine ? `:${EOL}` : ": ";
    return `${color}${header}${colon}${message}${TextColorEnum.reset}`;
  }
}
