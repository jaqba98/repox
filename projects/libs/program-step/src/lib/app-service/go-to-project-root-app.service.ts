import {singleton} from "tsyringe";
import {PathUtilsService} from "@lib/utils";
import {SimpleMessageAppService} from "@lib/logger";
import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for go to project root path.
 */
export class GoToProjectRootAppService {
    constructor(
        private readonly simpleMessage: SimpleMessageAppService,
        private readonly pathUtils: PathUtilsService
    ) {
    }

    run(): boolean {
        this.simpleMessage.writePlain(`Step: Go To Project Root`);
        const currentPath = this.pathUtils.getCurrentPath();
        const packageJsonPath = this.pathUtils.getPackageJsonPath(currentPath);
        if (packageJsonPath === EMPTY_STRING) {
            this.simpleMessage.writeError(`Workspace root path not found`);
            this.simpleMessage.writeWarning(`Run the command in the correct workspace directory`);
            return false;
        }
        this.pathUtils.changePath(packageJsonPath);
        return true;
    }
}
