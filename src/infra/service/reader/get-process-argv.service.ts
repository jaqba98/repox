import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for get parameters
 * given by user by command line.
 */
export class GetProcessArgvService {
  getArgv(): Array<string> {
    const { argv } = process;
    if (!argv) {
      throw new Error("Failed to read command line arguments!");
    }
    return argv;
  }
}
