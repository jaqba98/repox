import {singleton} from "tsyringe";

import {deepCopy} from "@lib/utils";

import {WorkspaceDtoStore} from "./workspace-dto.store";
import {WorkspaceDomainModel} from "../../model/workspace/workspace-domain.model";

@singleton()
/**
 * The store of workspace domain model.
 */
export class WorkspaceDomainStore {
    workspaceDomain: WorkspaceDomainModel | undefined;

    constructor(private readonly store: WorkspaceDtoStore) {
    }

    build(): void {
        this.workspaceDomain = {
            gitignoreTextDomain: this.store.gitignoreTextDto,
            npmRcTextDomain: this.store.npmRcTextDto,
            readmeMdTextDomain: this.store.readmeMdTextDto,
            workspacePackageJsonDomain: {
                name: this.store.workspacePackageJsonDto.name ?? "",
                version: this.store.workspacePackageJsonDto.version ?? "",
                private: this.store.workspacePackageJsonDto.private ?? false,
                scripts: deepCopy(this.store.workspacePackageJsonDto.scripts) ?? {},
                dependencies: deepCopy(this.store.workspacePackageJsonDto.dependencies) ?? {},
                devDependencies: deepCopy(this.store.workspacePackageJsonDto.devDependencies) ?? {}
            },
            repoxJsonDomain: {
                projects: deepCopy(this.store.repoxJsonDto.projects) ?? {}
            },
            tsconfigJsonDomain: {
                compilerOptions: deepCopy(this.store.tsconfigJsonDto.compilerOptions) ?? {},
                exclude: deepCopy(this.store.tsconfigJsonDto.exclude) ?? []
            }
        };
    }

    save(): void {
        if (!this.workspaceDomain) return;
        this.store.gitignoreTextDto = this.workspaceDomain.gitignoreTextDomain;
        this.store.npmRcTextDto = this.workspaceDomain.npmRcTextDomain;
        this.store.readmeMdTextDto = this.workspaceDomain.readmeMdTextDomain;
        this.store.workspacePackageJsonDto = deepCopy(this.workspaceDomain.workspacePackageJsonDomain);
        this.store.repoxJsonDto = deepCopy(this.workspaceDomain.repoxJsonDomain);
        this.store.tsconfigJsonDto = {
            compilerOptions: {
                ...deepCopy(this.workspaceDomain.tsconfigJsonDomain.compilerOptions)
            },
            exclude: deepCopy(this.workspaceDomain.tsconfigJsonDomain.exclude)
        };
    }

    projectExist(projectName: string): boolean {
        if (!this.workspaceDomain) return false;
        const project = Object.values(this.workspaceDomain.repoxJsonDomain.projects)
            .find(project => project.name === projectName);
        return Boolean(project);
    }
}
