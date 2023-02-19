import { LoggerModeEnum } from "../../enum/logger-mode.enum";

/**
 * The logger model which has all required data to display a message
 * correct on the console.
 */
export interface LoggerModel {
  mode: LoggerModeEnum;
  message: string;
}
