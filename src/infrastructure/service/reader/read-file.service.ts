import { singleton } from "tsyringe";
import { existsSync, readFileSync } from "fs";

@singleton()
/**
 * The service is responsible for read data of real file.
 */
export class ReadFileService {
  readJsonFile<TJson>(path: string): TJson {
    if (existsSync(path)) {
      const jsonString: string = readFileSync(path, "utf-8");
      return <TJson>JSON.parse(jsonString);
    }
    throw new Error(`Failed to read file ${path}`);
  }
}
