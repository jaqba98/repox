import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import {
  createPath,
  getCurrentPath,
  getDirnamePath,
  readJsonFile
} from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

const getModuleNameMapper = (
  tsconfigPath: string
): Config["moduleNameMapper"] => {
  const currentPath = getCurrentPath();
  const dirnamePath = getDirnamePath(tsconfigPath);
  const prefix = createPath(currentPath, dirnamePath);
  const tsconfig = readJsonFile<TsconfigJsonModel>(tsconfigPath);
  const paths = tsconfig?.compilerOptions?.paths ?? {};
  return pathsToModuleNameMapper(paths, { prefix });
}

export const moduleNameMapper = (tsconfigPath: string): Config => {
  return {
    moduleNameMapper: getModuleNameMapper(tsconfigPath)
  };
};
