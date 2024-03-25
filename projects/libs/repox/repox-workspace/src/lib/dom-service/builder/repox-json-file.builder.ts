import { singleton } from 'tsyringe'

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder'
import { WorkspaceDomainStore } from '../store/workspace-domain.store'
import { type RepoxJsonDomainModel } from '../../model/workspace/repox-json-domain.model'

@singleton()
/**
 * Create repox.json file.
 */
export class RepoxJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  constructor (private readonly store: WorkspaceDomainStore) {
    super()
  }

  generate () {
    if (!this.store.workspaceDomain) return
    this.store.workspaceDomain.repoxJsonDomain = this.buildDefaultRepoxJson()
  }

  regenerate () {
    if (!this.store.workspaceDomain) return
    this.store.workspaceDomain.repoxJsonDomain = {
      ...this.store.workspaceDomain.repoxJsonDomain,
      ...this.buildDefaultRepoxJson(),
      projects: {
        ...this.store.workspaceDomain.repoxJsonDomain.projects,
        ...this.buildDefaultRepoxJson().projects
      }
    }
  }

  private buildDefaultRepoxJson (): RepoxJsonDomainModel {
    return {
      projects: {}
    }
  }
}
