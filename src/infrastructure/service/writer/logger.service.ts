import { singleton } from "tsyringe";

@singleton()
/**
 * The service responsible for displaying the message on the console screen.
 */
export class LoggerService {
  log(message: string): void {
    console.log(message);
  }
}
