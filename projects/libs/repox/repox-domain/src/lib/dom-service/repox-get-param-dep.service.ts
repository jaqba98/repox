import {singleton} from "tsyringe";
import {type ParamDomainDepModel} from "@lib/param-domain";
import {RepoxArgumentEnum, RepoxCommandEnum, RepoxProgramEnum} from "@lib/repox-domain";
import {ProjectTypeEnum} from "@lib/repox-workspace";

@singleton()
/**
 * The service is responsible for getting dependency
 * for given program.
 */
export class RepoxGetParamDepService {
    getProgramDefault(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.default,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                }
            },
            args: {
                [RepoxArgumentEnum.version]: {
                    name: RepoxArgumentEnum.version,
                    values: [],
                    valueMode: `empty`,
                    required: false
                }
            }
        };
    }

    getProgramGenerate(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.generate,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                },
                [RepoxCommandEnum.workspace]: {
                    command: RepoxCommandEnum.workspace,
                    args: {
                        [RepoxArgumentEnum.name]: {
                            name: RepoxArgumentEnum.name,
                            values: [],
                            valueMode: `single`,
                            required: true
                        }
                    }
                },
                [RepoxCommandEnum.project]: {
                    command: RepoxCommandEnum.project,
                    args: {
                        [RepoxArgumentEnum.name]: {
                            name: RepoxArgumentEnum.name,
                            values: [],
                            valueMode: `single`,
                            required: true
                        },
                        [RepoxArgumentEnum.type]: {
                            name: RepoxArgumentEnum.type,
                            values: Object.values(ProjectTypeEnum),
                            valueMode: `single`,
                            required: true
                        },
                        [RepoxArgumentEnum.path]: {
                            name: RepoxArgumentEnum.path,
                            values: [],
                            valueMode: `single`,
                            required: false
                        }
                    }
                }
            },
            args: {}
        };
    }

    getProgramRegenerate(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.regenerate,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                },
                [RepoxCommandEnum.workspace]: {
                    command: RepoxCommandEnum.workspace,
                    args: {
                        [RepoxArgumentEnum.force]: {
                            name: RepoxArgumentEnum.force,
                            values: [],
                            valueMode: `empty`,
                            required: false
                        }
                    }
                }
            },
            args: {}
        };
    }

    getProgramBuild(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.build,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                },
                [RepoxCommandEnum.project]: {
                    command: RepoxCommandEnum.project,
                    args: {
                        [RepoxArgumentEnum.name]: {
                            name: RepoxArgumentEnum.name,
                            values: [],
                            valueMode: `single`,
                            required: true
                        },
                        [RepoxArgumentEnum.watch]: {
                            name: RepoxArgumentEnum.watch,
                            values: [],
                            valueMode: `empty`,
                            required: false
                        }
                    }
                }
            },
            args: {
                [RepoxArgumentEnum.production]: {
                    name: RepoxArgumentEnum.production,
                    values: [],
                    valueMode: `empty`,
                    required: false
                }
            }
        };
    }

    getProgramPublish(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.publish,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                },
                [RepoxCommandEnum.npm]: {
                    command: RepoxCommandEnum.npm,
                    args: {
                        [RepoxArgumentEnum.name]: {
                            name: RepoxArgumentEnum.name,
                            values: [],
                            valueMode: `single`,
                            required: true
                        }
                    }
                }
            },
            args: {}
        };
    }

    getProgramLint(): ParamDomainDepModel {
        return {
            program: RepoxProgramEnum.lint,
            commands: {
                [RepoxCommandEnum.default]: {
                    command: RepoxCommandEnum.default,
                    args: {}
                },
                [RepoxCommandEnum.project]: {
                    command: RepoxCommandEnum.project,
                    args: {
                        [RepoxArgumentEnum.fix]: {
                            name: RepoxArgumentEnum.fix,
                            values: [],
                            valueMode: `empty`,
                            required: false
                        }
                    }
                }
            },
            args: {}
        };
    }
}
