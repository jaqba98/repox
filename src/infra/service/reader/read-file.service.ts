import { singleton } from "tsyringe";
import { readFileSync, writeFileSync } from "fs";

@singleton()
/**
 * The service is responsible for read data of real file.
 */
export class ReadFileService {
  readJsonFile<T>(path: string): T {
    return <T>JSON.parse(readFileSync(path, "utf-8"));
  }
}
