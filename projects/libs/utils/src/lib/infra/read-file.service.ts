import { singleton } from "tsyringe";
import { readFileSync } from "fs";
import { ExistPathService } from "./exist-path.service";

@singleton()
/**
 * The service is responsible for read all types of data
 * from real file.
 */
export class ReadFileService {
  constructor(private readonly existPath: ExistPathService) {
  }

  readJson<T>(path: string): T {
    if (!this.existPath.checkExist(path)) {
      throw new Error("The specified file does not exist!");
    }
    return <T>JSON.parse(readFileSync(path, "utf-8"));
  }
}
