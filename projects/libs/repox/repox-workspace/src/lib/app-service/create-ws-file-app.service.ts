import { singleton } from "tsyringe";
import { WsRepoxDtoModel } from "../model/ws-dto/ws-repox-dto.model";
import {
  WsProjectTsconfigDtoModel,
  WsTsconfigDtoModel
} from "../model/ws-dto/ws-tsconfig-dto.model";

@singleton()
/**
 * The service is responsible for building default content
 * for all workspace files.
 */
export class CreateWsFileAppService {
  buildDefaultGitignoreContentFile(): string {
    return `# Webstorm
.idea/

# Compilation output
dist/

# Dependency directories
node_modules/

# Temporary files and directories
tmp/
`;
  }

  buildDefaultRootJestConfigTsContentFile(): string {
    return `import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  setupFilesAfterEnv: ["core-js/features/reflect"],
  testEnvironment: "jest-environment-node"
};

export default config;
`;
  }

  buildDefaultRepoxJsonContentFile(): WsRepoxDtoModel {
    return {
      projects: {}
    };
  }

  buildDefaultTsconfigJsonContentFile(): WsTsconfigDtoModel {
    return {
      compilerOptions: {
        target: "ES2022",
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        module: "commonjs",
        rootDir: "./projects",
        outDir: "./dist",
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
        baseUrl: ".",
        sourceMap: true,
        paths: {}
      },
      exclude: [
        "node_modules",
        "**/*.spec.ts",
        "**/*.test.ts",
        "**/jest.config.ts"
      ]
    };
  }

  buildProjectTsconfigJsonContentFile(): WsProjectTsconfigDtoModel {
    return {
      extends: "../../../../tsconfig.json"
    }
  }

  buildProjectJestConfigTsContentFile(): string {
    return `import config from "../../../../jest.config";

export default { ...config };
`;
  }
}
