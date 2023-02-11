import { singleton } from "tsyringe";
import { TextColorEnum } from "../../enum/text-color.enum";
import { LogModel } from "../../model/log.model";
import { EOL } from "os";

@singleton()
/**
 * Service responsible for process the message and display:
 * - information,
 * - success,
 * - error
 * - warning
 * - exception
 * to the console.
 */
export class LogSvc {
  write(log: LogModel): void {
    const { mode, msg, newLine } = log;
    switch (mode) {
      case "info":
        this.writeLog("Info", TextColorEnum.cyan, msg, newLine);
        break;
      case "succ":
        this.writeLog("Success", TextColorEnum.green, msg, newLine);
        break;
      case "err":
        this.writeLog("Error", TextColorEnum.red, msg, newLine);
        break;
      case "warn":
        this.writeLog("Warning", TextColorEnum.yellow, msg, newLine);
        break;
      case "excpt":
        this.writeException(TextColorEnum.red, msg, newLine);
        break;
      default:
        const wrongMode = "Not defined type of log message!";
        this.writeException(TextColorEnum.red, wrongMode, newLine);
        break;
    }
  }

  private writeLog(
    prefix: string,
    col: TextColorEnum,
    msg: string,
    newLine: boolean
  ): void {
    const message = this.buildMessage(prefix, col, msg, newLine);
    console.log(message);
  }

  private writeException(
    col: TextColorEnum,
    msg: string,
    newLine: boolean
  ): void {
    const message = this.buildMessage("", col, msg, newLine);
    throw new Error(message);
  }

  private buildMessage(
    prefix: string,
    col: TextColorEnum,
    msg: string,
    newLine: boolean
  ): string {
    const fullPrefix = newLine ? `${prefix}:${EOL}` : `${prefix}: `;
    return `${col}${fullPrefix}${msg}${TextColorEnum.reset}`;
  }
}
