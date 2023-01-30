import { singleton } from "tsyringe";
import { LoggerService } from "../logger/logger.service";

@singleton()
export class ValidationPrimitiveService {
  constructor(private readonly logger: LoggerService) {}

  isArray(value: any, err: string): void {
    if (!Array.isArray(value)) {
      this.logger.throw(err);
    }
  }
}
