import { singleton } from "tsyringe";
import {
  WsRootPackageJsonDtoModel
} from "../../model/ws-dto/ws-root-package-json-dto.model";

@singleton()
/**
 * The service is responsible for building root package json file.
 */
export class BuildRootPackageJsonService {
  rebuild (
    basePackageJsonContent: WsRootPackageJsonDtoModel
  ): WsRootPackageJsonDtoModel {
    return {
      ...basePackageJsonContent,
      name: ``,
      version: `1.0.0`,
      description: ``,
      main: `index.js`,
      scripts: {
        test: `echo "Error: no test specified" && exit 1`,
        ...basePackageJsonContent.scripts
      },
      keywords: [
        ...basePackageJsonContent.keywords
      ],
      author: ``,
      license: `ISC`
    };
  }

  build (): WsRootPackageJsonDtoModel {
    return {
      name: ``,
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
