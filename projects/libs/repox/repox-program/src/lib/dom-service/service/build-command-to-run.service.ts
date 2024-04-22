import { singleton } from "tsyringe";

import { SystemProgramEnum } from "../../enum/system-program/system-program.enum";

@singleton()
/**
 * The service is responsible for building
 * command to run.
 */
export class BuildCommandToRunService {
    build (packageManager: SystemProgramEnum, command: string): string {
        switch (packageManager) {
        case SystemProgramEnum.npm:
            return `npx ${command}`;
        case SystemProgramEnum.pnpm:
            return `pnpm ${command}`;
        case SystemProgramEnum.yarn:
            return `yarn ${command}`;
        default:
            throw new Error("Not supported packageManager!");
        }
    }
}
