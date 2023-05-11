import { LoggerModeEnum } from "../enum/logger-mode.enum";

/**
 * Logger domain model that stores data
 * that will be used to build a complete message
 * to be displayed on the console screen.
 */

export interface LoggerStyleModel {
  underscore: boolean;
}

export interface LoggerLineMessageModel extends LoggerStyleModel {
  value: string;
}

export interface LoggerLineModel {
  mode: keyof typeof LoggerModeEnum;
  isLogo: boolean;
  isHeader: boolean;
  headerContent: string;
  message: string | Array<LoggerLineMessageModel>;
  newline: number;
}

export interface LoggerDomainModel {
  lines: Array<LoggerLineModel>;
}
