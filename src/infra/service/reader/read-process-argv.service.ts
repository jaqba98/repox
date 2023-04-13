import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for read parameters given by user
 * by the command line.
 */
export class ReadProcessArgvService {
  getArgv(): Array<string> {
    return process.argv;
  }
}
// todo: fix it