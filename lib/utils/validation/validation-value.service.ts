import { singleton } from "tsyringe";
import { LoggerService } from "../../infrastructure/service/logger.service";

@singleton()
export class ValidationValueService {
  constructor(private readonly logger: LoggerService) {}

  isArrayOfString(value: Array<any>, err: string): void {
    if (value.some((val) => typeof val !== "string")) {
    }
  }
}
