import {singleton} from "tsyringe";

import {deepCopy} from "@lib/utils";

import {WorkspaceDtoStore} from "./workspace-dto.store";
import {WorkspaceDomainModel} from "../../model/workspace/workspace-domain.model";
import {PackageJsonDomainModel} from "../../model/workspace/package-json-domain.model";

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
                dependencies: deepCopy(this.store.workspacePackageJsonDto.dependencies) ?? {},
                devDependencies: deepCopy(this.store.workspacePackageJsonDto.devDependencies) ?? {}
            },
            repoxJsonDomain: {
                projects: deepCopy(this.store.repoxJsonDto.projects) ?? {}
            },
            tsconfigJsonDto: {
                compilerOptions: deepCopy(this.store.tsconfigJsonDto.compilerOptions) ?? {},
                exclude: deepCopy(this.store.tsconfigJsonDto.exclude) ?? []
            }
        };
    }

    setWorkspacePackageJsonDomain(domain: PackageJsonDomainModel): void {
        if (this.workspaceDomain) {
            this.workspaceDomain.workspacePackageJsonDomain = domain;
        }
    }
}
