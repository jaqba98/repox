/**
 * Log model is use to store the message ready to display.
 * It can stores: information, success, error, warning or exception.
 * The message will be displayed on the command line window.
 */
export interface LogModel {
  /**
   * info - information
   * succ - success
   * err - error
   * warn - warning
   * excpt - exception
   */
  mode: "info" | "succ" | "err" | "warn" | "excpt";
  msg: string;
  newLine: boolean;
}
