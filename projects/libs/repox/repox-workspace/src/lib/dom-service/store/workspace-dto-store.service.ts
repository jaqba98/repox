import {singleton} from "tsyringe";

import {PackageJsonDtoPartialModel} from "../../model/dto/package-json-dto.model";
import {RepoxJsonDtoPartialModel} from "../../model/dto/repox-json-dto.model";
import {TsconfigJsonDtoPartialModel} from "../../model/dto/tsconfig-json-dto.model";
import {readJsonFile, writeJsonToFile} from "@lib/utils";
import {WorkspaceFileEnum} from "../../enum/workspace-file.enum";

@singleton()
/**
 * The service is a store of workspace dto.
 */
export class WorkspaceDtoStoreService {
    private packageJsonDto: PackageJsonDtoPartialModel = {};

    private repoxJsonDto: RepoxJsonDtoPartialModel = {};

    private tsconfigJsonDto: TsconfigJsonDtoPartialModel = {};

    load(): void {
        this.packageJsonDto = readJsonFile(WorkspaceFileEnum.packageJson);
        this.repoxJsonDto = readJsonFile(WorkspaceFileEnum.repoxJson);
        this.tsconfigJsonDto = readJsonFile(WorkspaceFileEnum.tsconfigJson);
    }

    save(): void {
        writeJsonToFile(WorkspaceFileEnum.packageJson, this.packageJsonDto);
        writeJsonToFile(WorkspaceFileEnum.repoxJson, this.repoxJsonDto);
        writeJsonToFile(WorkspaceFileEnum.tsconfigJson, this.tsconfigJsonDto);
    }

    // addProject(): void {
    //     if (this.repoxJsonDto.projects) {
    //         this.repoxJsonDto.projects["test"] = {};
    //     }
    //     if (this.tsconfigJsonDto.compilerOptions?.paths) {
    //         this.tsconfigJsonDto.compilerOptions.paths["@lib/utils"] = [
    //             "projects/libs/utils/src/index.ts"
    //         ]
    //     }
    // }
}
