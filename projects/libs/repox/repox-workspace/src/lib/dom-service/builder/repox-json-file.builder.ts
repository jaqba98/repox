import { singleton } from 'tsyringe';

import { WorkspaceStructureAbstractBuilder } from './workspace-structure-abstract.builder';
import { WorkspaceDomainStore } from '../store/workspace-domain.store';

@singleton()
/**
 * Create repox.json file.
 */
export class RepoxJsonFileBuilder extends WorkspaceStructureAbstractBuilder {
  constructor (private readonly store: WorkspaceDomainStore) {
    super();
  }

  generate (): void {
    // if (this.store.workspaceDomain == null) return
    // this.store.workspaceDomain.repoxJsonDomain = this.buildDefaultRepoxJson()
  }

  regenerate (): void {
    if (this.store.workspaceDomain == null) return;
    this.store.workspaceDomain.repoxJsonDomain = {
      ...this.store.workspaceDomain.repoxJsonDomain,
      // ...this.buildDefaultRepoxJson(),
      projects: {
        ...this.store.workspaceDomain.repoxJsonDomain.projects
        // ...this.buildDefaultRepoxJson().projects
      }
    };
  }

  // private buildDefaultRepoxJson (): RepoxJsonDomainModel {
  //   return {
  //     projects: {}
  //   }
  // }
}
