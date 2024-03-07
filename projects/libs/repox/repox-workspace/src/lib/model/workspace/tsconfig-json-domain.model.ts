/**
 * The domain model uses by the system to work with tsconfig.json file.
 */


export interface TsconfigCompilerOptionsDomainModel {
}

export interface TsconfigJsonDomainModel {
    compilerOptions: TsconfigCompilerOptionsDomainModel;
    exclude: string[];
}
