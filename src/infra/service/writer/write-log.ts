import { singleton } from "tsyringe";

/**
 * Display a message on the screen.
 */
@singleton()
export class WriteLog {
  message(msg: string): void {
    console.log(msg);
  }
}
