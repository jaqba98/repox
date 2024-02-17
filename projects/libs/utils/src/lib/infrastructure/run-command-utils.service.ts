import {singleton} from "tsyringe";
import {execSync} from "child_process";

@singleton()
/**
 * The service is responsible for run command in bash
 * and return the result.
 */
export class RunCommandUtilsService {
    runCommand(command: string, verbose: boolean = false): string {
        return verbose
            ? execSync(command, {encoding: `utf-8`, stdio: `inherit`})
            : execSync(command, {encoding: `utf-8`});
    }

    runNpxCommand(command: string, verbose: boolean = false): string {
        return this.runCommand(`npx ${command}`, verbose);
    }
}

export const runCommand = (command: string): string => execSync(command, { encoding: `utf-8` });

// todo: refactor the code
