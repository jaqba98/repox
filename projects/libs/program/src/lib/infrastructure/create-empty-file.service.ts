// Refactored file
import { singleton } from "tsyringe";
import { WriteFileService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for creating an empty file
 * in the given path.
 */
export class CreateEmptyFileService {
  constructor(
    private readonly writeFile: WriteFileService
  ) {
  }

  create(filePath: string): void {
    this.writeFile.writeText(filePath, "");
  }
}
