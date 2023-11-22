import {singleton} from "tsyringe";

@singleton()
/**
 * The service is responsible for create alias for project.
 */
export class BuildProjectAliasService {
    buildAlias(name: string, type: string | undefined, prefix: string = ''): string {
        if (type === undefined) return ``;
        if (type.startsWith(`@app/`)) return ``;
        const typePrefix: string = type.split(`/`)[0];
        return `${prefix}${typePrefix}/${name}`;
    }
}
