import { Schema } from "jsonschema";

/**
 * Schemes used to verify the correctness of files.
 */

export const repoxJsonFileSchema: Schema = {
  id: "/RepoxJsonFileSchema",
  type: "object",
  properties: {
    projects: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          path: { type: "string" },
          src: { type: "string" },
          scheme: { type: "string" },
          build: {
            type: "object",
            properties: {
              output: { type: "string" },
              main: { type: "string" },
              pages: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    input: { type: "string" },
                    output: { type: "string" }
                  },
                  additionalProperties: false,
                  required: ["input", "output"]
                }
              },
              assets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    input: { type: "string" },
                    output: { type: "string" }
                  },
                  additionalProperties: false,
                  required: ["input", "output"]
                }
              }
            },
            additionalProperties: false
          }
        },
        if: {
          properties: {
            type: {
              const: "app"
            },
            scheme: {
              const: "@blank"
            }
          }
        },
        then: {
          properties: {
            build: {
              required: ["output"]
            }
          }
        },
        else: {
          if: {
            properties: {
              scheme: {
                const: "@app/ts"
              }
            }
          },
          then: {
            properties: {
              build: {
                required: ["output", "main"]
              }
            }
          }
        },
        additionalProperties: false,
        required: ["name", "type", "path", "src", "scheme"]
      }
    }
  },
  additionalProperties: false,
  required: ["projects"]
};

export const tsconfigJsonFileSchema: Schema = {
  id: "/TsconfigJsonFileSchema",
  type: "object",
  properties: {
    compilerOptions: {
      type: "object",
      properties: {
        paths: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: { type: "string" }
          }
        }
      },
      required: ["paths"]
    }
  },
  required: ["compilerOptions"]
};
