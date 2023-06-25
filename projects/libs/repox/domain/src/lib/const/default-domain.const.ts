import { RepoxDtoModel } from "../model/dto-model/repox-dto.model";

/**
 * The file contains all default content for domain files.
 */


export const GIT_IGNORE_DEFAULT: string = `# Workspace
.idea/

# Compilation output
dist/

# Dependency directories
node_modules/
**/node_modules/

# Temporary files and directories
tmp/
`;

export const TSCONFIG_DEFAULT: any = {
  compilerOptions: {
    target: "ES2022",
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    module: "commonjs",
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    strict: true,
    skipLibCheck: true,
    baseUrl: ".",
    sourceMap: true,
    paths: {}
  },
  include: [
    "projects/**/*"
  ],
  exclude: [
    "node_modules",
    "projects/**/node_modules",
    "projects/**/*.spec.ts",
    "projects/**/*.test.ts"
  ]
};

export const TSCONFIG_PROJECT = (
  rootTsconfigPath: string
): any => {
  return {
    extends: rootTsconfigPath
  };
};

export const REPOX_CONFIG_DEFAULT: RepoxDtoModel = {
  projects: {}
};
// todo: refactor
