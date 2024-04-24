// done
import { singleton } from "tsyringe";

import { CommandEnum } from "../../enum/launcher/command.enum";
import { ProgramEnum } from "../../enum/launcher/program.enum";
import { WriteHeaderStep } from "../../dom-service/step/write-header.step";
import { SystemProgramExistStep } from "../../dom-service/step/system-program-exist.step";
import { SystemProgramEnum } from "../../enum/system-program/system-program.enum";
import { WriteSuccessStep } from "../../dom-service/step/write-success.step";
import { BuildWorkspaceDomainStep } from "../../dom-service/step/build-workspace-domain.step";
import { BuildWorkspaceDtoStep } from "../../dom-service/step/build-workspace-dto.step";
import { CheckWorkspaceDtoStep } from "../../dom-service/step/check-workspace-dto.step";
import { InstallNpmStep } from "../../dom-service/step/install-npm.step";
import { GetCommandArgBooleanValueStep } from "../../dom-service/step/get-command-arg-boolean-value.step";
import { GoToWorkspaceRootStep } from "../../dom-service/step/go-to-workspace-root.step";
import { RegenerateWorkspaceStep } from "../../dom-service/step/regenerate-workspace.step";

@singleton()
/**
 * The app service is responsible for regenerating workspace.
 * Argument | Alias | Description   | Required | Value
 * --force  | -f    | Force mode.   | true     | boolean
 */
export class RegenerateWorkspaceAppService {
    constructor (
        private readonly writeHeader: WriteHeaderStep,
        private readonly getCommandArgBooleanValue: GetCommandArgBooleanValueStep,
        private readonly systemProgramExist: SystemProgramExistStep,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
        private readonly regenerateWorkspace: RegenerateWorkspaceStep,
        private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
        private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
        private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
        private readonly installNpm: InstallNpmStep,
        private readonly writeSuccess: WriteSuccessStep
    ) {
    }

    run (): boolean {
        if (!this.writeHeader.run(ProgramEnum.regenerate, CommandEnum.workspace)) return false;
        const force = this.getCommandArgBooleanValue.run("force", "f");
        if (force === undefined) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.yarn)) return false;
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.regenerateWorkspace.run()) return false;
        if (!this.buildWorkspaceDto.run()) return false;
        if (!this.checkWorkspaceDto.run()) return false;
        if (!this.buildWorkspaceDomain.run()) return false;
        if (!this.installNpm.run()) return false;
        if (!this.writeSuccess.run()) return false;
        return true;
    }
}
