import {singleton} from "tsyringe";

@singleton()
/**
 * Read parameters given by user from the command line.
 */
export class ReadArgvService {
    getArgv(): string[] {
        return process.argv;
    }
}
