import { singleton } from "tsyringe";

@singleton()
/**
 * The service is responsible for create .gitignore content.
 */
export class BuildGitignoreService {
  build (): string {
    return `# JetBrains tools
.idea/

# Compilation output
dist/

# Dependency directories
node_modules/

# Temporary files and directories
tmp/
`;
  }
}
