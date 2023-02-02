/**
 * Log model used to display message on the console.
 * It can display success, error or exception message.
 */
export interface LogModel {
  status: "success" | "error" | "warning" | "exception";
  msg: string;
}
