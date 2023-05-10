import { LoggerModeEnum } from "../enum/logger-mode.enum";

/**
 * All models for message builders for logger.
 */

export interface SimpleMessageModel {
  message: string;
  mode: LoggerModeEnum;
  isLogo: boolean;
  isHeader: boolean;
}
// todo: refactor
