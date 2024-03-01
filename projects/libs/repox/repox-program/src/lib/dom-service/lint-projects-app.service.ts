import {singleton} from "tsyringe";
import {SimpleMessageAppService} from "@lib/logger";
// import {WsDomainStoreService} from "@lib/repox-workspace";
import {RunCommandUtilsService} from "@lib/utils";

@singleton()
/**
 * The app service is responsible to run lint process.
 */
export class LintProjectsAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        // private readonly wsDomainStore: WsDomainStoreService,
        // private readonly runCommandUtils: RunCommandUtilsService
    ) {
    }

    run(fix: boolean): boolean {
        this.simpleMessage.writePlain(`Step: Lint Project`);
        if (fix) {
            this.lintFix();
        } else {
            this.lint();
        }
        return true;
    }

    private lint(): void {
        // const projects = Object.values(this.wsDomainStore.getWsDomain().projects);
        // for (const project of projects) {
        //     this.simpleMessage.writePlain(`Lint: ${project.name} project`);
        //     this.runCommandUtils.runNpxCommand(`eslint ${project.src}/**/*.ts -c .eslintrc.js`, true);
        // }
    }

    private lintFix(): void {
        // const projects = Object.values(this.wsDomainStore.getWsDomain().projects);
        // for (const project of projects) {
        //     this.simpleMessage.writePlain(`Lint: ${project.name} project`);
        //     this.runCommandUtils.runNpxCommand(`eslint ${project.src}/**/*.ts -c .eslintrc.js --fix`, true);
        // }
    }
}

// todo: refactor the code
