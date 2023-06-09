import { singleton } from "tsyringe";
import { SimpleMessageAppService } from "@lib/logger";
import { mkdirSync } from "fs";

@singleton()
/**
 * The service is responsible for create folder by name.
 */
export class CreateFolderService {
  constructor(
    private readonly simpleMessage: SimpleMessageAppService
  ) {
  }

  create(folderName: string): void {
    this.simpleMessage.writePlain(
      `Create a folder named ${folderName}`, 0
    );
    mkdirSync(folderName);
  }
}
