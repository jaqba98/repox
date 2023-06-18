import { singleton } from "tsyringe";
import { mkdirSync } from "fs";
import { SimpleMessageAppService } from "@lib/logger";

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
    mkdirSync(folderName, { recursive: true });
  }
}
