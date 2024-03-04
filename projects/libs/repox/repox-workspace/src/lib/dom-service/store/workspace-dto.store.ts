import {singleton} from "tsyringe";

import {
    pathExist,
    readJsonFile,
    readTextFile,
    writeJsonToFile,
    writeToFile
} from "@lib/utils";

import {PackageJsonDtoPartialModel} from "../../model/dto/package-json-dto.model";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";
import {TsconfigJsonDtoPartialModel} from "../../model/dto/tsconfig-json-dto.model";
import {RepoxJsonDtoPartialModel} from "../../model/dto/repox-json-dto.model";

@singleton()
/**
 * The store of workspace dto model.
 */
export class WorkspaceDtoStore {
    gitignoreTextDto: string = "";

    npmRcTextDto: string = "";

    readmeMdTextDto: string = "";

    workspacePackageJsonDto: PackageJsonDtoPartialModel = {};

    repoxJsonDto: RepoxJsonDtoPartialModel = {};

    tsconfigJsonDto: TsconfigJsonDtoPartialModel = {};

    load(): void {
        this.loadGitignoreTextDto();
        this.loadNpmRcTextDto();
        this.loadReadmeMdTextDto();
        this.loadWorkspacePackageJsonDto();
        this.loadRepoxJsonDto();
        this.loadTsconfigJsonDto();
    }

    save(): void {
        writeToFile(WorkspaceFileEnum.gitignore, this.gitignoreTextDto);
        writeToFile(WorkspaceFileEnum.npmrc, this.npmRcTextDto);
        writeToFile(WorkspaceFileEnum.readmeMd, this.readmeMdTextDto);
        writeJsonToFile(WorkspaceFileEnum.packageJson, this.workspacePackageJsonDto);
        writeJsonToFile(WorkspaceFileEnum.repoxJson, this.repoxJsonDto);
        writeJsonToFile(WorkspaceFileEnum.tsconfigJson, this.tsconfigJsonDto);
    }

    private loadGitignoreTextDto(): void {
        if (pathExist(WorkspaceFileEnum.gitignore)) {
            this.gitignoreTextDto = readTextFile(WorkspaceFileEnum.gitignore);
        } else {
            this.gitignoreTextDto = "";
        }
    }

    private loadNpmRcTextDto(): void {
        if (pathExist(WorkspaceFileEnum.npmrc)) {
            this.npmRcTextDto = readTextFile(WorkspaceFileEnum.npmrc);
        } else {
            this.npmRcTextDto = "";
        }
    }

    private loadReadmeMdTextDto(): void {
        if (pathExist(WorkspaceFileEnum.readmeMd)) {
            this.readmeMdTextDto = readTextFile(WorkspaceFileEnum.readmeMd);
        } else {
            this.readmeMdTextDto = "";
        }
    }

    private loadWorkspacePackageJsonDto(): void {
        if (pathExist(WorkspaceFileEnum.packageJson)) {
            this.workspacePackageJsonDto = readJsonFile(WorkspaceFileEnum.packageJson);
        } else {
            this.workspacePackageJsonDto = {};
        }
    }

    private loadRepoxJsonDto(): void {
        if (pathExist(WorkspaceFileEnum.repoxJson)) {
            this.repoxJsonDto = readJsonFile(WorkspaceFileEnum.repoxJson);
        } else {
            this.repoxJsonDto = {};
        }
    }

    private loadTsconfigJsonDto(): void {
        if (pathExist(WorkspaceFileEnum.tsconfigJson)) {
            this.tsconfigJsonDto = readJsonFile(WorkspaceFileEnum.tsconfigJson);
        } else {
            this.tsconfigJsonDto = {};
        }
    }
}
