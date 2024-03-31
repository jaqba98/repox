// I am here
import { singleton } from 'tsyringe'

import { pathExist, readJsonFile, writeJsonToFile } from '@lib/utils'

import { type PackageJsonDtoPartialModel } from '../../model/dto/package-json-dto.model'
import { WorkspaceFileEnum } from '../../enum/workspace-file.enum'
import { type TsconfigJsonDtoPartialModel } from '../../model/dto/tsconfig-json-dto.model'
import { type RepoxJsonDtoPartialModel } from '../../model/dto/repox-json-dto.model'

@singleton()
/**
 * The store of workspace dto model.
 */
export class WorkspaceDtoStore {
  workspacePackageJsonDto: PackageJsonDtoPartialModel = {}

  repoxJsonDto: RepoxJsonDtoPartialModel = {}

  tsconfigJsonDto: TsconfigJsonDtoPartialModel = {}

  load (): boolean {
    this.loadWorkspacePackageJsonDto()
    this.loadRepoxJsonDto()
    this.loadTsconfigJsonDto()
    return true
  }

  save (): void {
    writeJsonToFile(WorkspaceFileEnum.packageJson, this.workspacePackageJsonDto)
    writeJsonToFile(WorkspaceFileEnum.repoxJson, this.repoxJsonDto)
    writeJsonToFile(WorkspaceFileEnum.tsconfigJson, this.tsconfigJsonDto)
  }

  private loadWorkspacePackageJsonDto (): void {
    if (pathExist(WorkspaceFileEnum.packageJson)) {
      this.workspacePackageJsonDto = readJsonFile(WorkspaceFileEnum.packageJson)
    } else {
      this.workspacePackageJsonDto = {}
    }
  }

  private loadRepoxJsonDto (): void {
    if (pathExist(WorkspaceFileEnum.repoxJson)) {
      this.repoxJsonDto = readJsonFile(WorkspaceFileEnum.repoxJson)
    } else {
      this.repoxJsonDto = {}
    }
  }

  private loadTsconfigJsonDto (): void {
    if (pathExist(WorkspaceFileEnum.tsconfigJson)) {
      this.tsconfigJsonDto = readJsonFile(WorkspaceFileEnum.tsconfigJson)
    } else {
      this.tsconfigJsonDto = {}
    }
  }
}
