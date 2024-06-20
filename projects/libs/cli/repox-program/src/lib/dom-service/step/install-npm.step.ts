// done
import { singleton } from "tsyringe";

import { StepMessageAppService } from "@lib/logger";
import { WorkspaceDomainStore } from "@lib/repox-workspace";
import { runCommand } from "@lib/utils";

import { installNpmStepMsg } from "../../const/message/step-message.const";
import { BuildCommandToRunService } from "../service/build-command-to-run.service";

@singleton()
/**
 * The step dom-service is responsible for installing npm.
 */
export class InstallNpmStep {
    constructor (
        private readonly stepMessage: StepMessageAppService,
        private readonly workspaceDomainStore: WorkspaceDomainStore,
        private readonly buildCommandToRun: BuildCommandToRunService
    ) {}

    run (): boolean {
        this.stepMessage.write(installNpmStepMsg());
        const { defaultOptions } = this.workspaceDomainStore.getWorkspaceDomain().repoxJsonDomain;
        const { packageManager } = defaultOptions;
        const commandToRun = this.buildCommandToRun.build(packageManager, "install");
        runCommand(commandToRun);
        return true;
    }
}
