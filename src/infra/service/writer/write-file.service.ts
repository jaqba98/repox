import { singleton } from "tsyringe";
import { writeFileSync } from "fs";

@singleton()
/**
 * The service is responsible for write data to real file.
 */
export class WriteFileService {
  writeJsonFile<T>(path: string, content: T): void {
    writeFileSync(path, JSON.stringify(content, null, 2));
  }
}
