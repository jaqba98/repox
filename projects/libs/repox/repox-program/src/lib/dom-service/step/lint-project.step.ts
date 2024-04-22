// done
import { singleton } from "tsyringe";

import { NewlineAppService, SimpleMessageAppService, StepMessageAppService } from "@lib/logger";
import {
    type RepoxJsonDomainProjectModel,
    WorkspaceDomainStore
} from "@lib/repox-workspace";
import { EMPTY_STRING } from "@lib/const";
import { createPath, runCommand } from "@lib/utils";

import { lintProjectStepMsg } from "../../const/message/step-message.const";
import { BuildCommandToRunService } from "../service/build-command-to-run.service";
import { lintProjectPlainMsg, runCommandPlainMsg } from "../../const/message/plain-message.const";
import { projectIsCorrectSuccessMsg } from "../../const/message/success-message.enum";

@singleton()
/**
 * The step dom-service is responsible for linting projects.
 */
export class LintProjectStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly buildCommandToRun: BuildCommandToRunService,
    private readonly newline: NewlineAppService,
    private readonly simpleMessage: SimpleMessageAppService
    ) {}

    run (projects: string[], fix: boolean): boolean {
        this.stepMessage.write(lintProjectStepMsg());
        const { defaultOptions } = this.workspaceDomainStore.getWorkspaceDomain().repoxJsonDomain;
        const { packageManager } = defaultOptions;
        const projectsToLint = this.getProjectsToLint(projects);
        const fixArg = fix ? "--fix" : EMPTY_STRING;
        const programArg = "eslint";
        for (const projectToLint of projectsToLint) {
            const pathArg = createPath(projectToLint.root, "**/*.{js,mjs,ts}");
            const command = `${programArg} ${pathArg} ${fixArg}`;
            const commandToRun = this.buildCommandToRun.build(packageManager, command);
            this.newline.writeNewline();
            this.simpleMessage.writePlain(lintProjectPlainMsg(projectToLint.name));
            this.simpleMessage.writePlain(runCommandPlainMsg(commandToRun));
            runCommand(commandToRun, true);
            this.simpleMessage.writeSuccess(projectIsCorrectSuccessMsg());
            this.newline.writeNewline();
        }
        return true;
    }

    private getProjectsToLint (projects: string[]): RepoxJsonDomainProjectModel[] {
        const { repoxJsonDomain } = this.workspaceDomainStore.getWorkspaceDomain();
        if (projects.length === 0) {
            return Object.values(repoxJsonDomain.projects);
        }
        return Object.values(repoxJsonDomain.projects)
            .filter(project => projects.includes(project.name));
    }
}
