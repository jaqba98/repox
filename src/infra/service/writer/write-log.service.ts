import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for displaying the message
 * on the screen.
 */
export class WriteLogService {
  message(msg: string): void {
    console.log(msg);
  }
}
// todo: refactor this