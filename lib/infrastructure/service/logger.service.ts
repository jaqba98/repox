import { singleton } from "tsyringe";
import { ConsoleColorEnum } from "../enum/console-color.enum";
import { LoggerModel } from "../model/logger-transport.model";

@singleton()
/*
   Service responsible for process the message
   and display success, error or throw an error to the console.
*/
export class LoggerService {
  // Display success, error or throw exception in the console.
  log(data: LoggerModel): void {
    data.success
      ? this.logSuccess(data.message)
      : data.exception
      ? this.throwException(data.message)
      : this.logError(data.message);
  }

  // Display success message in the console.
  private logSuccess(message: string): void {
    this.consoleLog(ConsoleColorEnum.green, `Success: ${message}`);
  }

  // Throw exception in the console.
  private throwException(message: string): void {
    throw new Error(message);
  }

  // Display error message in the console.
  private logError(message: string): void {
    this.consoleLog(ConsoleColorEnum.red, `Error: ${message}`);
  }

  // Display message in the console.
  private consoleLog(color: ConsoleColorEnum, message: string): void {
    console.log(this.buildMessage(color, message));
  }

  // Build the message to display.
  private buildMessage(color: ConsoleColorEnum, message: string): string {
    return `${color}${message}${ConsoleColorEnum.reset}`;
  }
}
