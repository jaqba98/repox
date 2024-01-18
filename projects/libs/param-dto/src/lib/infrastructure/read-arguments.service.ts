import {singleton} from "tsyringe";
import process from "process";

@singleton()
/** Read arguments given by user from the command line. */
export class ReadArgumentsService {
    read(): string[] {
        return process.argv;
    }
}

// todo: refactor the code