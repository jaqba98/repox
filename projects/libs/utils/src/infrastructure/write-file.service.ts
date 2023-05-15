import { singleton } from "tsyringe";
import { writeFileSync } from "fs";

@singleton()
/**
 * Write the data to the actual file on disk.
 */
export class WriteFileService {
  writeJsonFile<TContent>(path: string, content: TContent): void {
    const jsonString: string = JSON.stringify(content, null, 2);
    writeFileSync(path, jsonString);
  }
}
// todo: refactor