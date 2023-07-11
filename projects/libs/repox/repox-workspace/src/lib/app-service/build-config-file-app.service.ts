import { singleton } from "tsyringe";
import { TsconfigModel } from "../model/config/tsconfig.model";
import { RepoxModel } from "../model/config/repox.model";

@singleton()
/**
 * The service is responsible for building default content
 * for all config files.
 */
export class BuildConfigFileAppService {
  buildDefaultTsconfigJsonFile(): TsconfigModel {
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

  buildDefaultRepoxJsonFile(): RepoxModel {
    return {
      projects: {}
    };
  }

  buildDefaultGitignoreTextFile(): string {
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

  buildDefaultRootJestTsFile(): string {
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
}
