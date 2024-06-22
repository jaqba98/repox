import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { readJsonFile } from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

const getModuleNameMapper = (
  tsconfigPath: string
): Config["moduleNameMapper"] => {
  const tsconfig = readJsonFile<TsconfigJsonModel>(tsconfigPath);
  const paths = tsconfig?.compilerOptions?.paths ?? {};
  return pathsToModuleNameMapper(paths, { prefix: "<rootDir>" });
}

export const moduleNameMapper = (tsconfigPath: string): Config => {
  return {
    moduleNameMapper: getModuleNameMapper(tsconfigPath)
  };
};
