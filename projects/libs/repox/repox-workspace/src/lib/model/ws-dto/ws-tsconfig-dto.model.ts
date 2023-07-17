/**
 * The real dto model of the tsconfig configuration file on the disc
 * with all required properties.
 */

export interface TsconfigPathsModel {
  [alias: string]: Array<string>;
}

export interface WsTsconfigDtoModel {
  compilerOptions: {
    target: string;
    experimentalDecorators: boolean;
    emitDecoratorMetadata: boolean;
    module: string;
    rootDir: string;
    outDir: string;
    esModuleInterop: boolean;
    forceConsistentCasingInFileNames: boolean;
    strict: boolean;
    skipLibCheck: boolean;
    baseUrl: string;
    sourceMap: boolean;
    paths: TsconfigPathsModel;
  },
  exclude: Array<string>;
}