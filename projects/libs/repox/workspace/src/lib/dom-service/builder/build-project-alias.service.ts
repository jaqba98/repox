import { singleton } from "tsyringe";
import { DomainTypeEnum, } from "../../enum/domain-type.enum";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
  buildAlias(type: DomainTypeEnum, name: string): string {
    return `@${type}/${name}`;
  }
}
// todo: refactor
