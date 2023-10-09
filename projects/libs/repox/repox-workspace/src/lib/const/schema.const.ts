import {type Schema} from "jsonschema";

/**
 * Schemes used to verify the correctness of files.
 */

export const repoxJsonFileSchema: Schema = {
    id: `/RepoxJsonFileSchema`,
    type: `object`,
    properties: {
        projects: {
            type: `object`,
            additionalProperties: {
                type: `object`,
                properties: {
                    name: {type: `string`},
                    type: {type: `string`},
                    path: {type: `string`},
                    src: {type: `string`},
                    assets: {
                        type: `array`,
                        items: {
                            type: `object`,
                            properties: {
                                input: {type: `string`},
                                output: {type: `string`}
                            },
                            additionalProperties: false,
                            required: [`input`, `output`]
                        }
                    }
                },
                additionalProperties: false,
                required: [`name`, `type`, `path`, `src`]
            }
        }
    },
    additionalProperties: false,
    required: [`projects`]
};

export const tsconfigJsonFileSchema: Schema = {
    id: `/TsconfigJsonFileSchema`,
    type: `object`,
    properties: {
        compilerOptions: {
            type: `object`,
            properties: {
                paths: {
                    type: `object`,
                    additionalProperties: {
                        type: `array`,
                        items: {type: `string`}
                    }
                }
            },
            required: [`paths`]
        }
    },
    required: [`compilerOptions`]
};
