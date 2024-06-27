import { singleton } from "tsyringe";

@singleton()
export class WriteMessageService {
  write(message: string) {
    console.log(message);
  }
}
