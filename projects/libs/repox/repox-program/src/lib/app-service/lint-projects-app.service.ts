import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
import {WsDomainStoreService} from "@lib/repox-workspace";
import {RunCommandUtilsService} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for checking
 * whether a given project not exist.
 */
export class LintProjectsAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly wsDomainStore: WsDomainStoreService,
        private readonly runCommandUtils: RunCommandUtilsService
    ) {
    }

    run(fix: boolean): boolean {
        this.simpleMessage.writePlain(`Lint projects`);
        const projects = Object
            .values(this.wsDomainStore.getWsDomain().projects);
        const fixMode: string = fix ? `--fix` : ``;
        for (const project of projects) {
            this.simpleMessage.writePlain(`Lint ${project.name} project`);
            this.runCommandUtils.runNpxCommand(
                `eslint ${project.src}/**/*.ts -c .eslintrc.json ${fixMode}`, true
            );
        }
        return true;
    }
}

// todo: refactor the file
