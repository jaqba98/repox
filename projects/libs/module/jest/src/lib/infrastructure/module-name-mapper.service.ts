import { Config } from "jest";

import {
  findWorkspacePath,
  getCurrentPath,
  readJsonFile
} from "@lib/utils";
import { TsconfigJsonModel } from "@lib/model";

export const getModuleNameMapper = (): Config['moduleNameMapper'] => {
  const currentPath = getCurrentPath();
  const workspacePath = findWorkspacePath(currentPath);
  // TODO: Use enum instead of string
  const tsconfig = readJsonFile<TsconfigJsonModel>("tsconfig.json");
  return {};
};
