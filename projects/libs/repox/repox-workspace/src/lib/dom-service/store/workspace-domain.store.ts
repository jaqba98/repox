// done
import { singleton } from 'tsyringe'

import { type WorkspaceDomainModel } from '../../model/domain/workspace-domain.model'

@singleton()
/**
 * The store of workspace domain model.
 */
export class WorkspaceDomainStore {
  workspaceDomain: WorkspaceDomainModel | undefined

  getWorkspaceDomain (): WorkspaceDomainModel {
    if (this.workspaceDomain === undefined) {
      throw new Error('The WorkspaceDomainModel.workspaceDomain is undefined!')
    }
    return this.workspaceDomain
  }
}
