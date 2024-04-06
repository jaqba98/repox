// done
import { type Schema } from 'jsonschema';

import { ProjectTypeEnum } from '@lib/repox-workspace';

import { SystemProgramEnum } from '../../enum/system-program/system-program.enum';

/**
 * The schema is responsible for checking
 * whether the repox.json file is correct.
 */

export const repoxJsonDtoSchema: Schema = {
  id: '/RepoxJsonDto',
  type: 'object',
  properties: {
    defaultOptions: {
      type: 'object',
      properties: {
        packageManager: {
          type: 'string',
          enum: [
            SystemProgramEnum.npm,
            SystemProgramEnum.pnpm,
            SystemProgramEnum.yarn
          ]
        }
      }
    },
    projects: {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          properties: {
            name: { type: 'string' },
            root: { type: 'string' },
            src: { type: 'string' },
            type: {
              type: 'string',
              enum: Object.values(ProjectTypeEnum)
            },
            targets: { type: 'object' }
          },
          required: ['name', 'root', 'src', 'type']
        }
      }
    }
  }
};
