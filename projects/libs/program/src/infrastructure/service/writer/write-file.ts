import { singleton } from "tsyringe";
import { writeFileSync } from "fs";

/**
 * Write the data to the actual file on disk.
 */
@singleton()
export class WriteFile {
  writeJsonFile<TContent>(path: string, content: TContent): void {
    const jsonString: string = JSON.stringify(content, null, 2);
    writeFileSync(path, jsonString);
  }
}
// todo: refactor