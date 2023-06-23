import { singleton } from "tsyringe";
import { readFileSync } from "fs";
import { PathUtilsService } from "./path-utils.service";

@singleton()
/**
 * The service is responsible for read all types of data
 * from real file.
 */
export class ReadFileService {
  constructor(private readonly existPath: PathUtilsService) {
  }

  readJson<T>(path: string): T {
    if (!this.existPath.checkExist(path)) {
      throw new Error("The specified file does not exist!");
    }
    return <T>JSON.parse(readFileSync(path, "utf-8"));
  }
}
// todo: refactor
