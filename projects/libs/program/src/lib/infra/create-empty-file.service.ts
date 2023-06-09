import { singleton } from "tsyringe";
import { WriteFileService } from "@lib/utils";
import { SimpleMessageAppService } from "@lib/logger";

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

  create(file: string): void {
    this.simpleMessage.writePlain(`Create the empty ${file} file`, 0);
    this.writeFile.writeText(file, "");
  }
}
