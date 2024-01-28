import {singleton} from "tsyringe";

import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The service provides methods for working with
 * user-supplied arguments on the command line.
 */
export class CommandLineArgsService {
    getUserArgs(): string[] {
        return this.getArgs().slice(2);
    }

    private getArgs(): string[] {
        return deepCopy(process.argv);
    }
}
