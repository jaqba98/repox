/**
 * The real dto model of the tsconfig.json file on the disc with all required properties.
 */

export interface TsconfigJsonDtoModel {
    compilerOptions?: {
        target?: string;
        module?: string;
        esModuleInterop?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        strict?: boolean;
        skipLibCheck?: boolean;
        experimentalDecorators?: boolean;
        emitDecoratorMetadata?: boolean;
        rootDir?: string;
        outDir?: string;
        sourceMap?: boolean;
        paths?: Record<string, string[]>;
    },
    include?: string[];
}

// todo: done