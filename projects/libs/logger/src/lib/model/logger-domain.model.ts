import { LoggerModeEnum } from "../enum/logger-mode.enum";

/**
 * The logger domain model that stores data.
 * It will be used to build a complete message
 * to be displayed on the console screen.
 */

export interface LoggerLineMessageModel {
  value: string;
  underscore: boolean;
}

export interface LoggerLineModel {
  mode: LoggerModeEnum;
  isLogo: boolean;
  isHeader: boolean;
  headerContent: string;
  message: Array<LoggerLineMessageModel>;
  newline: number;
}

export interface LoggerDomainModel {
  lines: Array<LoggerLineModel>;
}
// todo: refactor
