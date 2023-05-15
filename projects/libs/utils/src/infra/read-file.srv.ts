import { singleton } from "tsyringe";
import { readFileSync } from "fs";
import { ExistPathSrv } from "./exist-path.srv";

@singleton()
/**
 * The service is responsible for read all types of data
 * from real file.
 */
export class ReadFileSrv {
  constructor(private readonly existPath: ExistPathSrv) {
  }

  readJson<T>(path: string): T {
    if (!this.existPath.checkExist(path)) {
      throw new Error("The specified file does not exist!");
    }
    return <T>JSON.parse(readFileSync(path, "utf-8"));
  }
}
