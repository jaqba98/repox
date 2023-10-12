import {singleton} from "tsyringe";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
    buildAlias(name: string, type: string | undefined): string {
        if (type === `app` || type === undefined) return ``;
        return `@${type}/${name}`;
    }
}
