import {RepoxJsonDomainModel} from "./repox-json-domain.model";
import {PackageJsonDomainModel} from "./package-json-domain.model";
import {TsconfigJsonDomainModel} from "./tsconfig-json-domain.model";

/**
 * The domain model uses by the system to work with workspace files.
 */

export interface WorkspaceDomainModel {
    gitignoreTextDomain: string;
    npmRcTextDomain: string;
    readmeMdTextDomain: string;
    workspacePackageJsonDomain: PackageJsonDomainModel;
    repoxJsonDomain: RepoxJsonDomainModel;
    tsconfigJsonDto: TsconfigJsonDomainModel;
}
