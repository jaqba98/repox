import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import {
  createPath,
  findWorkspacePath,
  getCurrentPath,
  readJsonFile
} from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

const getModuleNameMapper = (): Config["moduleNameMapper"] => {
  const currentPath = getCurrentPath();
  const workspacePath = findWorkspacePath(currentPath);
  // TODO: change the tsconfig.json string to enum
  const tsconfigPath = createPath(workspacePath, "tsconfig.json");
  const tsconfig = readJsonFile<TsconfigJsonModel>(tsconfigPath);
  const paths = tsconfig?.compilerOptions?.paths ?? {};
  return pathsToModuleNameMapper(paths, { prefix: workspacePath });
}

export const moduleNameMapper = (): Config => {
  return {
    moduleNameMapper: getModuleNameMapper()
  };
};
