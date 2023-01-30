import { singleton } from "tsyringe";

@singleton()
export class LoggerService {
  throw(msg: string): void {
    throw new Error(msg);
  }
}
