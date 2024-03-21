import {singleton} from "tsyringe";

import {WriteHeaderStep} from "../../dom-service/step/write-header.step";
import {ProgramEnum} from "../../enum/launcher/program.enum";
import {CommandEnum} from "../../enum/launcher/command.enum";
import {
    GetCommandArgSingleValueStep
} from "../../dom-service/step/get-command-arg-single-value.step";
import {GoToWorkspaceRootStep} from "../../dom-service/step/go-to-workspace-root.step";
import {BuildWorkspaceDtoStep} from "../../dom-service/step/build-workspace-dto.step";
import {
    BuildWorkspaceDomainStep
} from "../../dom-service/step/build-workspace-domain.step";
import {SaveWorkspaceDtoStep} from "../../dom-service/step/save-workspace-dto.step";
import {WriteSuccessStep} from "../../dom-service/step/write-success.step";
import {SystemProgramExistStep} from "../../dom-service/step/system-program-exist.step";
import {SystemProgramEnum} from "../../enum/system-program/system-program.enum";
import {CheckProjectExistStep} from "../../dom-service/step/check-project-exist.step";
import {BuildProjectStep} from "../../dom-service/step/build-project.step";

@singleton()
/**
 * The app service is responsible for building project.
 * Argument | Alias | Description            | Required | Value
 * --name   | -n    | Name of the project.   | true     | string
 */
export class BuildProjectAppService {
    constructor(
        private readonly writeHeader: WriteHeaderStep,
        private readonly systemProgramExist: SystemProgramExistStep,
        private readonly getCommandArgSingleValue: GetCommandArgSingleValueStep,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
        private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
        private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
        private readonly checkProjectExist: CheckProjectExistStep,
        private readonly buildProject: BuildProjectStep,
        private readonly writeSuccess: WriteSuccessStep
    ) {
    }

    run(): boolean {
        if (!this.writeHeader.run(ProgramEnum.build, CommandEnum.project)) {
            return false;
        }
        const name = this.getCommandArgSingleValue.run("name", "n");
        if (!name) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false;
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.buildWorkspaceDto.run()) return false;
        if (!this.buildWorkspaceDomain.run()) return false;
        if (!this.checkProjectExist.run(name)) return false;
        if (!this.buildProject.run(name)) return false;
        if (!this.writeSuccess.run()) return false;
        return true;
    }
}
