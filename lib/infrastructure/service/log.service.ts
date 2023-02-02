import { singleton } from "tsyringe";
import { LogColorEnum } from "../enum/log-color.enum";
import { LogModel } from "../model/log.model";

@singleton()
/**
 * Service responsible for process the message
 * and display success, error or throw an error to the console.
 */
export class LogService {
  log(logData: LogModel): void {
    switch (logData.status) {
      case "success":
        this.logSuccess(logData.msg);
        break;
      case "error":
        this.logError(logData.msg);
        break;
      case "warning":
        this.logWarning(logData.msg);
        break;
      case "exception":
        this.logException(logData.msg);
        break;
      default:
        this.logException("Not defined type of log message!");
    }
  }

  private logSuccess(msg: string): void {
    this.consoleLog(LogColorEnum.green, `Success: ${msg}`);
  }

  private logError(msg: string): void {
    this.consoleLog(LogColorEnum.red, `Error: ${msg}`);
  }

  private logWarning(msg: string): void {
    this.consoleLog(LogColorEnum.yellow, `Warning: ${msg}`);
  }

  private logException(msg: string): void {
    throw new Error(msg);
  }

  private consoleLog(color: LogColorEnum, msg: string): void {
    console.log(this.buildMessage(color, msg));
  }

  private buildMessage(color: LogColorEnum, msg: string): string {
    return `${color}${msg}${LogColorEnum.reset}`;
  }
}
