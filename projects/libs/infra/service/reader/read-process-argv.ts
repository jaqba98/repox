import { singleton } from "tsyringe";

/**
 * Read parameters given by user from the command line.
 */
@singleton()
export class ReadProcessArgv {
  getArgv(): Array<string> {
    return process.argv;
  }
}
