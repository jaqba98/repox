import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import {
  createPath,
  findWorkspacePath,
  getCurrentPath,
  readJsonFile
} from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

export const getModuleNameMapper = (): Config['moduleNameMapper'] => {
  const currentPath = getCurrentPath();
  const workspacePath = findWorkspacePath(currentPath);
  // TODO: Use enum instead of string
  const tsconfigPath = createPath(workspacePath, "tsconfig.json");
  const tsconfigContent = readJsonFile<TsconfigJsonModel>(tsconfigPath);
  const paths = tsconfigContent?.compilerOptions?.paths ?? {};
  return pathsToModuleNameMapper(paths, { prefix: "<rootDir>" });
};
