import { singleton } from "tsyringe";
import {
  WsRootPackageJsonDtoModel
} from "../../model/ws-dto/ws-root-package-json-dto.model";
import { FolderUtilsService } from "@lib/utils";

@singleton()
/**
 * The service is responsible for building root package json file.
 */
export class BuildRootPackageJsonService {
  constructor(private readonly folderUtils: FolderUtilsService) {
  }

  rebuild (
    basePackageJsonContent: WsRootPackageJsonDtoModel
  ): WsRootPackageJsonDtoModel {
    return {
      ...basePackageJsonContent,
      ...this.build(),
      scripts: {
        ...this.build().scripts,
        ...basePackageJsonContent.scripts
      },
      keywords: [
        ...this.build().keywords,
        ...basePackageJsonContent.keywords
      ],
      devDependencies: {
        ...basePackageJsonContent.devDependencies,
        ...this.build().devDependencies,
      },
      dependencies: {
        ...basePackageJsonContent.dependencies,
        ...this.build().dependencies,
      }
    };
  }

  build (): WsRootPackageJsonDtoModel {
    return {
      name: this.folderUtils.getCurrentFolderName(),
      version: `1.0.0`,
      description: ``,
      main: `index.js`,
      scripts: {
        test: `echo "Error: no test specified" && exit 1`
      },
      keywords: [],
      author: ``,
      license: `ISC`,
      devDependencies: {
        "@types/core-js": `2.5.6`,
        "@types/jest": `29.5.4`,
        "@types/node": `20.5.9`,
        "@typescript-eslint/eslint-plugin": `6.5.0`,
        "@typescript-eslint/parser": `6.5.0`,
        "eslint": `8.48.0`,
        "jest": `29.6.4`,
        "repox": `1.4.12`,
        "ts-jest": `29.1.1`,
        "ts-node": `10.9.1`,
        "tsc-alias": `1.8.7`,
        "typescript": `5.2.2`
      },
      dependencies: {
        "core-js": `3.32.1`,
        "tsyringe": `4.8.0`
      }
    };
  }
}
