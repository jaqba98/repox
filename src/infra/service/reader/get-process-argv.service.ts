import { singleton } from "tsyringe";

@singleton()
export class GetProcessArgvService {
  getArgv(): Array<string> {
    const { argv } = process;
    if (!argv) {
      throw new Error("Failed to read command line arguments!");
    }
    return argv;
  }
}
