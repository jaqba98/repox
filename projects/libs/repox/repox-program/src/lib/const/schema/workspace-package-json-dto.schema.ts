// done
import { type Schema } from 'jsonschema'

/**
 * The schema is responsible for checking
 * whether the workspace package.json file is correct.
 */

export const workspacePackageJsonDtoSchema: Schema = {
  id: '/WorkspacePackageJsonDto',
  type: 'object'
}
