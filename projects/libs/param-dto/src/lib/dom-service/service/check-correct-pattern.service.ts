import {singleton} from "tsyringe";

@singleton()
/**
 * The service is responsible for checking whether value has correct pattern.
 */
export class CheckCorrectPatternService {
    checkProgramAndCommand(name: string): boolean {
        return /^[a-zA-Z][a-zA-Z0-9-]*$/.test(name);
    }

    checkArgument(name: string): boolean {
        return /^--[a-zA-Z0-9-]*$/.test(name);
    }

    checkAlias(name: string): boolean {
        return /^-[a-zA-Z0-9-]*$/.test(name);
    }
}
