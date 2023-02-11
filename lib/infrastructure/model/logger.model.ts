import { LoggerModeEnum } from "../enum/logger-mode.enum";

export interface LoggerModel {
  mode: LoggerModeEnum;
  message: string;
  newLine: boolean;
}
