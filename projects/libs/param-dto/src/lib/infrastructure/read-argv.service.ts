import { singleton } from "tsyringe";

@singleton()
/**
 * Read parameters given by user from the command line.
 */
export class ReadArgvService {
  getArgv(): Array<string> {
    return process.argv;
  }
}
