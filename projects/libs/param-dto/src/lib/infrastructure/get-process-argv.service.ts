import {singleton} from "tsyringe";

@singleton()
/**
 * The service retrieves arguments provided by the user.
 * These arguments are stored in the process variable.
 */
export class GetProcessArgvService {
    get(): string[] {
        return process.argv.slice(2);
    }
}
