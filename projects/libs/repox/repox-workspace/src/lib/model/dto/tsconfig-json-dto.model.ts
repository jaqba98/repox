/**
 * The real dto model of the tsconfig.json file on the disc with all required properties.
 */

export interface TsconfigJsonDtoModel {
    compilerOptions?: {
        rootDir?: string;
        outDir?: string;
    },
    exclude?: string[];
}

// todo: done