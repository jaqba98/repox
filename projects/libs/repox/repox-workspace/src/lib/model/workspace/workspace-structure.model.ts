import { type InjectionToken } from 'tsyringe'

import {
  type WorkspaceStructureAbstractBuilder
} from '../../dom-service/builder/workspace-structure-abstract.builder'

/**
 * The model represent structure of workspace.
 */

export interface WorkspaceStructureBuilderModel {
  path: string
  builder: InjectionToken<WorkspaceStructureAbstractBuilder>
  children: WorkspaceStructureBuilderModel[]
}

export interface WorkspaceStructureModel {
  structure: WorkspaceStructureBuilderModel[]
}
