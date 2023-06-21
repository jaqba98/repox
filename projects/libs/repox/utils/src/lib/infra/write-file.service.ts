import { singleton } from "tsyringe";
import { writeFileSync } from "fs";

@singleton()
/**
 * The service is responsible for writing data
 * to a real file on the disc.
 */
export class WriteFileService {
  writeText(path: string, content: string): void {
    writeFileSync(path, content);
  }

  writeJson<T>(path: string, content: T): void {
    writeFileSync(path, JSON.stringify(content, null, 2));
  }
}
// todo: refactor
