// done
import { singleton } from "tsyringe";

import { StepMessageAppService } from "@lib/logger";
import {
    ExecutorEnum,
    type RepoxJsonDomainTargetModel,
    WorkspaceDomainStore
} from "@lib/repox-workspace";
import { runCommand } from "@lib/utils";

import { buildProjectStepMsg } from "../../const/message/step-message.const";
import { type SystemProgramEnum } from "../../enum/system-program/system-program.enum";
import { BuildCommandToRunService } from "../service/build-command-to-run.service";

@singleton()
/**
 * The step service is responsible for building project to the workspace domain.
 */
export class BuildProjectStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly buildCommandToRun: BuildCommandToRunService
    ) {
    }

    run (name: string, prod: boolean): boolean {
        this.stepMessage.write(buildProjectStepMsg(name));
        const { projects, defaultOptions } = this.workspaceDomainStore.getWorkspaceDomain().repoxJsonDomain;
        const { packageManager } = defaultOptions;
        const project = Object.values(projects).find(project => project.name === name);
        if (project === undefined) return false;
        const { build } = project.targets;
        if (build.executor === ExecutorEnum.typescript) {
            return this.buildTypescriptProject(packageManager, build, prod);
        }
        return false;
    }

    private buildTypescriptProject (
        packageManager: SystemProgramEnum,
        build: RepoxJsonDomainTargetModel,
        prod: boolean
    ): boolean {
        const tsconfig = prod ? build.production.tsconfig : build.development.tsconfig;
        const commandTsc = `tsc --project ${tsconfig}`;
        const commandTscAlias = `tsc-alias -p ${tsconfig}`;
        runCommand(this.buildCommandToRun.build(packageManager, commandTsc), true);
        runCommand(this.buildCommandToRun.build(packageManager, commandTscAlias), true);
        return true;
    }
}
