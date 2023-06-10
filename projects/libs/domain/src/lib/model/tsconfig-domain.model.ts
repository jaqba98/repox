/**
 * The simplified tsconfig.json model for my purposes.
 */

export interface CompilerOptionsPathsModel {
  [alias: string]: Array<string>;
}

export interface TsconfigDomainModel {
  compilerOptions: {
    target: string;
    experimentalDecorators: boolean;
    emitDecoratorMetadata: boolean;
    module: string;
    esModuleInterop: boolean;
    forceConsistentCasingInFileNames: boolean;
    strict: boolean;
    skipLibCheck: boolean;
    baseUrl: string;
    sourceMap: boolean;
    paths: CompilerOptionsPathsModel;
  };
  "include": Array<string>;
  "exclude": Array<string>;
}

export interface TsconfigProjectDomainModel {
  compilerOptions: {
  };
}
