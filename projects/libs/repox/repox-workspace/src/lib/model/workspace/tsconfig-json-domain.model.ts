/**
 * The domain model uses by the system to work with tsconfig.json file.
 */


export interface TsconfigCompilerOptionsDomainModel {
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
    paths: Record<string, string[]>;
}

export interface TsconfigJsonDomainModel {
    compilerOptions: TsconfigCompilerOptionsDomainModel;
    exclude: string[];
}
