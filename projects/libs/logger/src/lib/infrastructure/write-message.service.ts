import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for displaying the prepared message
 * on the console screen.
 */
export class WriteMessageService {
  write(message: string): void {
    console.log(message);
  }
}
