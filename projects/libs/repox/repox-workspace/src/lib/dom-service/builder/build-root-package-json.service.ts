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
      ]
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
      license: `ISC`
    };
  }
}
