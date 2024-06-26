import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { FileEnum } from "@lib/core";
import {
  createPath,
  findWorkspacePath,
  getCurrentPath,
  readJsonFile
} from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

const getModuleNameMapper = (): Config["moduleNameMapper"] => {
  const currentPath = getCurrentPath();
  const wsPath = findWorkspacePath(currentPath);
  const tsconfigPath = createPath(wsPath, FileEnum.tsconfigJson);
  const tsconfig = readJsonFile<TsconfigJsonModel>(tsconfigPath);
  const paths = tsconfig?.compilerOptions?.paths ?? {};
  return pathsToModuleNameMapper(paths, { prefix: wsPath });
}

export const moduleNameMapper = (): Config => {
  return {
    moduleNameMapper: getModuleNameMapper()
  };
};
