import { type RepoxJsonDomainModel } from './repox-json-domain.model'
import { type PackageJsonDomainModel } from './package-json-domain.model'
import { type TsconfigJsonDomainModel } from './tsconfig-json-domain.model'

/**
 * The domain model uses by the system to work with workspace files.
 */

export interface WorkspaceDomainModel {
  // gitignoreTextDomain: string
  // npmRcTextDomain: string
  // readmeMdTextDomain: string
  workspacePackageJsonDomain: PackageJsonDomainModel
  repoxJsonDomain: RepoxJsonDomainModel
  tsconfigJsonDomain: TsconfigJsonDomainModel
}
