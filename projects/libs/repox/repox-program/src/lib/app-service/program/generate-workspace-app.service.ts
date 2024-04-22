// done
import { singleton } from "tsyringe";

import { CommandEnum } from "../../enum/launcher/command.enum";
import { ProgramEnum } from "../../enum/launcher/program.enum";
import { WriteHeaderStep } from "../../dom-service/step/write-header.step";
import { GetCommandArgStringValueStep } from "../../dom-service/step/get-command-arg-string-value.step";
import { SystemProgramExistStep } from "../../dom-service/step/system-program-exist.step";
import { SystemProgramEnum } from "../../enum/system-program/system-program.enum";
import { FolderNotExistStep } from "../../dom-service/step/folder-not-exist.step";
import { CreateFolderStep } from "../../dom-service/step/create-folder.step";
import { ChangePathStep } from "../../dom-service/step/change-path.step";
import { WriteSuccessStep } from "../../dom-service/step/write-success.step";
import { GenerateWorkspaceStep } from "../../dom-service/step/generate-workspace.step";
import { BuildWorkspaceDomainStep } from "../../dom-service/step/build-workspace-domain.step";
import { BuildWorkspaceDtoStep } from "../../dom-service/step/build-workspace-dto.step";
import { CheckWorkspaceDtoStep } from "../../dom-service/step/check-workspace-dto.step";

@singleton()
/**
 * The app service is responsible for generating workspace from scratch.
 * Argument | Alias | Description            | Required | Value
 * --name   | -n    | Name of the workspace. | true     | string
 */
export class GenerateWorkspaceAppService {
    constructor (
    private readonly writeHeader: WriteHeaderStep,
    private readonly getCommandArgStringValue: GetCommandArgStringValueStep,
    private readonly systemProgramExist: SystemProgramExistStep,
    private readonly folderNotExist: FolderNotExistStep,
    private readonly createFolder: CreateFolderStep,
    private readonly changePath: ChangePathStep,
    private readonly generateWorkspace: GenerateWorkspaceStep,
    private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
    private readonly checkWorkspaceDto: CheckWorkspaceDtoStep,
    private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
    private readonly writeSuccess: WriteSuccessStep
    ) {
    }

    run (): boolean {
        if (!this.writeHeader.run(ProgramEnum.generate, CommandEnum.workspace)) return false;
        const name = this.getCommandArgStringValue.run("name", "n");
        if (name === false) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.node)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.git)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.npm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.pnpm)) return false;
        if (!this.systemProgramExist.run(SystemProgramEnum.yarn)) return false;
        if (!this.folderNotExist.run(name)) return false;
        if (!this.createFolder.run(name)) return false;
        if (!this.changePath.run(name)) return false;
        if (!this.generateWorkspace.run()) return false;
        if (!this.buildWorkspaceDto.run()) return false;
        if (!this.checkWorkspaceDto.run()) return false;
        if (!this.buildWorkspaceDomain.run()) return false;
        if (!this.writeSuccess.run()) return false;
        return true;
    }
}
