import { singleton } from 'tsyringe'
import ts from 'typescript'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { WorkspaceFolderEnum } from '../../enum/workspace-folder.enum'
import { WorkspaceDomainStore } from '../store/workspace-domain.store'
import { type TsconfigJsonDomainModel } from '../../model/workspace/tsconfig-json-domain.model'

@singleton()
/**
 * Create tsconfig.json file.
 */
export class TsconfigJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  constructor (private readonly store: WorkspaceDomainStore) {
    super()
  }

  generate (): void {
    if (this.store.workspaceDomain == null) return
    this.store.workspaceDomain.tsconfigJsonDomain = this.buildDefaultTsconfigJson()
  }

  regenerate (): void {
    if (this.store.workspaceDomain == null) return
    this.store.workspaceDomain.tsconfigJsonDomain = {
      ...this.store.workspaceDomain.tsconfigJsonDomain,
      compilerOptions: {
        ...this.store.workspaceDomain.tsconfigJsonDomain.compilerOptions,
        ...this.buildDefaultTsconfigJson().compilerOptions,
        paths: {
          ...this.store.workspaceDomain.tsconfigJsonDomain.compilerOptions.paths,
          ...this.buildDefaultTsconfigJson().compilerOptions.paths
        }
      },
      exclude: [
        ...this.buildDefaultTsconfigJson().exclude
      ]
    }
  }

  private buildDefaultTsconfigJson (): TsconfigJsonDomainModel {
    return {
      compilerOptions: {
        target: ts.server.protocol.ScriptTarget.ES2022,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        module: ts.server.protocol.ModuleKind.CommonJS,
        rootDir: WorkspaceFolderEnum.projects,
        outDir: WorkspaceFolderEnum.dist,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
        baseUrl: '.',
        sourceMap: true,
        paths: {}
      },
      exclude: [
        'node_modules'
      ]
    }
  }
}
