// done
import { type Schema } from 'jsonschema';

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
          enum: ['npm', 'pnpm', 'yarn']
        }
      },
      required: ['packageManager'],
      additionalProperties: false
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
              enum: ['app', 'lib', 'tool']
            }
          },
          required: ['name', 'root', 'src', 'type'],
          additionalProperties: false
        }
      },
      additionalProperties: false
    }
  },
  required: ['defaultOptions', 'projects'],
  additionalProperties: false
};
