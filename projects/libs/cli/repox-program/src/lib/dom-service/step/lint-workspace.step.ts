// done
import { singleton } from "tsyringe";

import { NewlineAppService, SimpleMessageAppService, StepMessageAppService } from "@lib/logger";
import { WorkspaceDomainStore } from "@lib/repox-workspace";
import { EMPTY_STRING } from "@lib/const";
import { runCommand } from "@lib/utils";

import { lintWorkspaceStepMsg } from "../../const/message/step-message.const";
import { BuildCommandToRunService } from "../service/build-command-to-run.service";
import { lintWorkspacePlainMsg, runCommandPlainMsg } from "../../const/message/plain-message.const";
import { workspaceIsCorrectSuccessMsg } from "../../const/message/success-message.enum";

@singleton()
/**
 * The step dom-service is responsible for linting workspace.
 */
export class LintWorkspaceStep {
    constructor (
    private readonly stepMessage: StepMessageAppService,
    private readonly workspaceDomainStore: WorkspaceDomainStore,
    private readonly buildCommandToRun: BuildCommandToRunService,
    private readonly newline: NewlineAppService,
    private readonly simpleMessage: SimpleMessageAppService
    ) {}

    run (fix: boolean): boolean {
        this.stepMessage.write(lintWorkspaceStepMsg());
        const { defaultOptions } = this.workspaceDomainStore.getWorkspaceDomain().repoxJsonDomain;
        const { packageManager } = defaultOptions;
        const programArg = "eslint";
        const pathArg = "./*.{js,mjs,ts}";
        const fixArg = fix ? "--fix" : EMPTY_STRING;
        const command = `${programArg} ${pathArg} ${fixArg}`;
        const commandToRun = this.buildCommandToRun.build(packageManager, command);
        this.newline.writeNewline();
        this.simpleMessage.writePlain(lintWorkspacePlainMsg());
        this.simpleMessage.writePlain(runCommandPlainMsg(commandToRun));
        runCommand(commandToRun, true);
        this.simpleMessage.writeSuccess(workspaceIsCorrectSuccessMsg());
        this.newline.writeNewline();
        return true;
    }
}
