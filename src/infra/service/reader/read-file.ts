import { singleton } from "tsyringe";
import { ExecCommand } from "../exec/exec-command";

/**
 * Read data of real file.
 */
@singleton()
export class ReadFile {
  constructor(private readonly execCommand: ExecCommand) {
  }

  readJsonFile<TJson>(path: string): TJson {
    if (this.execCommand.pathNotExist(path)) {
      throw new Error(`The ${path} file does not exist!`);
    }
    const fileContent: string = this.execCommand.readFile(path);
    return <TJson>JSON.parse(fileContent);
  }
}
