import { singleton } from "tsyringe";
import { writeFileSync } from "fs";

@singleton()
/**
 * The service is responsible for write data to real file.
 */
export class WriteFileService {
  writeJsonFile<TContent>(path: string, content: TContent): void {
    const jsonString: string = JSON.stringify(content, null, 2);
    writeFileSync(path, jsonString);
  }
}
// todo: refactor this