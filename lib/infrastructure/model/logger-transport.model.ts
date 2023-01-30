/*
    The transport model of the message
    to be displayed by the logger.
*/
export interface LoggerModel {
  success: boolean;
  message: string;
  exception: boolean;
}
