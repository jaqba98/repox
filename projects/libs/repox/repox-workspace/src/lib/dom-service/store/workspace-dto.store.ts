// done
import { singleton } from 'tsyringe'

import { type PackageJsonDtoPartialModel } from '../../model/dto/package-json-dto.model'
import { type RepoxJsonDtoPartialModel } from '../../model/dto/repox-json-dto.model'
import { type TsconfigJsonDtoPartialModel } from '../../model/dto/tsconfig-json-dto.model'

@singleton()
/**
 * The store of workspace dto model.
 */
export class WorkspaceDtoStore {
  workspacePackageJsonDto: PackageJsonDtoPartialModel | undefined

  repoxJsonDto: RepoxJsonDtoPartialModel | undefined

  tsconfigJsonDto: TsconfigJsonDtoPartialModel | undefined
}
