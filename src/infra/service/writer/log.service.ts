import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for displaying the message
 * on the screen.
 */
export class LogService {
  message(msg: string): void {
    console.log(msg);
  }
}
