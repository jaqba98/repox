import { singleton } from "tsyringe";

import { BuildMessageService } from "./build-message.service";
import { LoggerModeEnum } from "../../../../../core/src/lib/enum/status.enum";
import { EMPTY_STRING } from "@lib/core";

@singleton()
/**
 * The service is responsible for building the simple message.
 */
export class BuildSimpleMessageService {
    constructor (private readonly buildMessage: BuildMessageService) {
    }

    buildSuccess (message: string, logo: string): string {
        return this.baseBuildMsg(message, logo, LoggerModeEnum.success);
    }

    buildError (message: string, logo: string): string {
        return this.baseBuildMsg(message, logo, LoggerModeEnum.error);
    }

    buildWarning (message: string, logo: string): string {
        return this.baseBuildMsg(message, logo, LoggerModeEnum.warning);
    }

    buildInfo (message: string, logo: string): string {
        return this.baseBuildMsg(message, logo, LoggerModeEnum.info);
    }

    buildPlain (message: string): string {
        return this.buildMessage.build({
            lines: [{
                mode: LoggerModeEnum.plain,
                logo: { visible: false, content: EMPTY_STRING },
                header: { visible: false, content: EMPTY_STRING },
                words: [{ content: message, underscore: false }],
                newline: 0
            }]
        });
    }

    private baseBuildMsg (
        message: string,
        logo: string,
        loggerMode: LoggerModeEnum
    ): string {
        const logoVisible = logo !== EMPTY_STRING;
        const headerContent = loggerMode.toUpperCase();
        return this.buildMessage.build({
            lines: [{
                mode: loggerMode,
                logo: { visible: logoVisible, content: logo },
                header: { visible: true, content: headerContent },
                words: [{ content: message, underscore: false }],
                newline: 0
            }]
        });
    }
}
