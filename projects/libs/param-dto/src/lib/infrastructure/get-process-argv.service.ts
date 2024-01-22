import {singleton} from "tsyringe";

import {deepCopy} from "@lib/utils";

@singleton()
/**
 * The service retrieves arguments provided by the user.
 * These arguments are stored in the process variable.
 */
export class GetProcessArgvService {
    get(): string[] {
        return deepCopy(process.argv).slice(2);
    }
}
