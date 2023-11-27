import { singleton } from "tsyringe";
import {
  WsRootPackageJsonDtoModel
} from "../../model/ws-dto/ws-root-package-json-dto.model";
import {ArrayUtilsService, FolderUtilsService} from "@lib/utils";

@singleton()
/**
 * The service is responsible for building root package json file.
 */
export class BuildRootPackageJsonService {
  constructor(
    private readonly folderUtils: FolderUtilsService,
    private readonly arrayUtils: ArrayUtilsService
  ) {
  }

  rebuild (
    basePackageJsonContent: WsRootPackageJsonDtoModel
  ): WsRootPackageJsonDtoModel {
    return {
      ...(basePackageJsonContent ?? {}),
      ...this.build(),
      scripts: {
        ...(basePackageJsonContent?.scripts ?? {}),
        ...this.build().scripts
      },
      keywords: this.arrayUtils.removeDuplicates([
        ...(basePackageJsonContent?.keywords ?? []),
        ...this.build().keywords
      ]),
      devDependencies: {
        ...(basePackageJsonContent?.devDependencies ?? {}),
        ...this.build().devDependencies,
      },
      dependencies: {
        ...(basePackageJsonContent?.dependencies ?? {}),
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
        "@types/core-js": `2.5.8`,
        "@types/jest": `29.5.10`,
        "@types/node": `20.9.4`,
        "@typescript-eslint/eslint-plugin": `6.12.0`,
        "@typescript-eslint/parser": `6.12.0`,
        "eslint": `8.54.0`,
        "jest": `29.7.0`,
        "repox": `1.4.16`,
        "ts-jest": `29.1.1`,
        "ts-node": `10.9.1`,
        "tsc-alias": `1.8.8`,
        "typescript": `5.3.2`
      },
      dependencies: {
        "core-js": `3.33.3`,
        "tsyringe": `4.8.0`
      }
    };
  }
}
