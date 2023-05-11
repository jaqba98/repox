import { singleton } from "tsyringe";
import { existsSync, readFileSync } from "fs";

@singleton()
/**
 * Read data of real file.
 */
export class ReadFileService {
  readJsonFile<TJson>(path: string): TJson {
    if (!existsSync(path)) {
      throw new Error(`The ${path} file does not exist!`);
    }
    const fileContent: string = readFileSync(path, "utf-8");
    return <TJson>JSON.parse(fileContent);
  }
}
