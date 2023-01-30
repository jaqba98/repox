import { singleton } from "tsyringe";
import { LoggerService } from "../../infrastructure/service/logger.service";

@singleton()
export class ValidationPrimitiveService {
  constructor(private readonly logger: LoggerService) {}

  isArray(value: any, err: string): void {
    if (!Array.isArray(value)) {
    }
  }
}
