import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { WriteFileService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for create empty file by name.
 */
export class CreateEmptyFileService {
  constructor(
    private readonly writeFile: WriteFileService,
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  create(path: string): void {
    this.simpleMessage.writePlain(
      `Create the empty file: ${path}`, 0
    );
    this.writeFile.writeText(path, "");
  }
}
