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
import {SaveWorkspaceDomainStep} from "../../dom-service/step/save-workspace-domain.step";
import {SaveWorkspaceDtoStep} from "../../dom-service/step/save-workspace-dto.step";
import {WriteSuccessStep} from "../../dom-service/step/write-success.step";
import {GenerateProjectStep} from "../../dom-service/step/generate-project.step";
import {FolderNotExistStep} from "../../dom-service/step/folder-not-exist.step";
import {CreateFolderStep} from "../../dom-service/step/create-folder.step";
import {ChangePathStep} from "../../dom-service/step/change-path.step";
import {createPath} from "@lib/utils";

@singleton()
/**
 * The app service is responsible for generating project from scratch.
 * Argument | Alias | Description            | Required | Value
 * --name   | -n    | Name of the project.   | true     | string
 * --path   | -p    | Path to the project.   | true     | string
 * --type   | -t    | Project type.          | true     | string
 */
export class GenerateProjectAppService {
    constructor(
        private readonly writeHeader: WriteHeaderStep,
        private readonly getCommandArgSingleValue: GetCommandArgSingleValueStep,
        private readonly goToWorkspaceRoot: GoToWorkspaceRootStep,
        private readonly buildWorkspaceDto: BuildWorkspaceDtoStep,
        private readonly buildWorkspaceDomain: BuildWorkspaceDomainStep,
        private readonly folderNotExist: FolderNotExistStep,
        private readonly createFolder: CreateFolderStep,
        private readonly changePath: ChangePathStep,
        private readonly generateProject: GenerateProjectStep,
        private readonly saveWorkspaceDomain: SaveWorkspaceDomainStep,
        private readonly saveWorkspaceDto: SaveWorkspaceDtoStep,
        private readonly writeSuccess: WriteSuccessStep
    ) {
    }

    run(): boolean {
        if (!this.writeHeader.run(ProgramEnum.generate, CommandEnum.project)) {
            return false;
        }
        const name = this.getCommandArgSingleValue.run("name", "n");
        if (!name) return false;
        const path = this.getCommandArgSingleValue.run("path", "p");
        if (!path) return false;
        const type = this.getCommandArgSingleValue.run("type", "t");
        if (!type) return false;
        const projectPath = createPath(path, name);
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.buildWorkspaceDto.run()) return false;
        if (!this.buildWorkspaceDomain.run()) return false;
        if (!this.folderNotExist.run(projectPath)) return false;
        if (!this.createFolder.run(projectPath)) return false;
        if (!this.changePath.run(projectPath)) return false;
        if (!this.generateProject.run(name, path, type)) return false;
        if (!this.goToWorkspaceRoot.run()) return false;
        if (!this.saveWorkspaceDomain.run()) return false;
        if (!this.saveWorkspaceDto.run()) return false;
        if (!this.writeSuccess.run()) return false;
        return true;
    }
}
