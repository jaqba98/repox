import {singleton} from "tsyringe";

import {EMPTY_STRING} from "@lib/const";

@singleton()
/**
 * The service is responsible for building an empty file content.
 */
export class BuildEmptyFileContentService {
    build(): string {
        return EMPTY_STRING;
    }
}
