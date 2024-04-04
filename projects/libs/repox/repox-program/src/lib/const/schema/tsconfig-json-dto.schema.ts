// done
import { type Schema } from 'jsonschema';

/**
 * The schema is responsible for checking
 * whether the tsconfig.json file is correct.
 */

export const tsconfigJsonDtoSchema: Schema = {
  id: '/TsconfigJsonDto',
  type: 'object'
};
