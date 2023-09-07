import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for create .eslintrc.js content.
 */
export class BuildEslintrcJsService {
  build (): string {
    return `/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  root: true
};
`;
  }
}
