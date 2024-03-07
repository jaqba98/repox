import ts from "typescript";

/**
 * The domain model uses by the system to work with tsconfig.json file.
 */


export interface TsconfigCompilerOptionsDomainModel extends ts.server.protocol.CompilerOptions {
}

export interface TsconfigJsonDomainModel {
    compilerOptions: TsconfigCompilerOptionsDomainModel;
    exclude: string[];
}
