// todo: refactor
import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for displaying the message
 * on the shell screen.
 */
export class LogService {
  msg(msg: string): void {
    console.log(msg);
  }

  json<TJson>(json: TJson): void {
    console.log(json);
  }
}
