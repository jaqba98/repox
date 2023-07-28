import { Schema } from "jsonschema";

/**
 * Schemes used to verify the correctness of files.
 */

export const htmlProJsonFileSchema: Schema = {
  id: "/HtmlProJsonFileSchema",
  type: "object",
  properties: {
    components: {
      type: "object",
      properties: {
        alias: {
          type: "string"
        },
        templateUrl: {
          type: "string"
        },
        styleUrls: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      required: ["alias", "templateUrl", "styleUrls"]
    }
  },
  required: ["components"]
};
