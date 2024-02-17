import ts from "typescript";

/**
 * The model DTO represents real content of tsconfig.json file.
 */

export interface TsconfigJsonDtoModel {
    compilerOptions: ts.server.protocol.CompilerOptions;
}

export interface TsconfigJsonDtoPartialModel extends Partial<TsconfigJsonDtoModel> {
}
