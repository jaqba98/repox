import { singleton } from "tsyringe";

@singleton()
export class WriteMessageService {
  write(message: string): void {
    console.log(message);
  }
}
// todo: refactor
