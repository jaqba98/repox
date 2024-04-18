/* eslint-disable max-lines */
import { container } from "tsyringe";

import { ParamDtoDirector } from "./param-dto.director";
import { ParamDtoBuilder } from "../builder/param-dto/param-dto.builder";
import { type ParamDto } from "../domain/param-dto";

describe("ParamDtoDirector", (): void => {
    let service: ParamDtoDirector;

    beforeEach((): void => {
        service = container.resolve(ParamDtoDirector);
    });

    afterEach((): void => {
        container.reset();
        container.clearInstances();
    });

    // 1. args === undefined
    test("Should be correct undefined", (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const args: any = undefined;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: undefined,
            program: undefined,
            command: undefined,
            programArgs: undefined,
            commandArgs: undefined
        });
    });

    // 2. args === []
    test("Should be correct empty array", (): void => {
        const args: string[] = [];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: [],
            program: undefined,
            command: undefined,
            programArgs: undefined,
            commandArgs: undefined
        });
    });

    // 3. args === ["program", "--arg1", "-a", "command", "--arg2", "-b"]
    test("Should be correct: program --arg1 -a command --arg2 -b", (): void => {
        const args = ["program", "--arg1", "-a", "command", "--arg2", "-b"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg1", "-a", "command", "--arg2", "-b"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 1,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-a",
                    index: 2,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg2",
                    index: 4,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-b",
                    index: 5,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ]
        });
    });

    // 4. args === ["program", "--arg1", "-a", "--arg2", "-b"]
    test("Should be correct: program --arg1 -a --arg2 -b", (): void => {
        const args = ["program", "--arg1", "-a", "--arg2", "-b"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg1", "-a", "--arg2", "-b"],
            program: { baseValue: "program", index: 0 },
            command: undefined,
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 1,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                }, {
                    baseValue: "-a",
                    index: 2,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "--arg2",
                    index: 3,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-b",
                    index: 4,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: undefined
        });
    });

    // 5. args === ["--arg1", "-a", "--arg2", "-b", "command"]
    test("Should be correct: --arg1 -a --arg2 -b command", (): void => {
        const args = ["--arg1", "-a", "--arg2", "-b", "command"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["--arg1", "-a", "--arg2", "-b", "command"],
            program: undefined,
            command: { baseValue: "command", index: 4 },
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 0,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-a",
                    index: 1,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "--arg2",
                    index: 2,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-b",
                    index: 3,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: undefined
        });
    });

    // 6. args === ["--arg1", "-a", "--arg2", "-b"]
    test("Should be correct: --arg1 -a --arg2 -b", (): void => {
        const args = ["--arg1", "-a", "--arg2", "-b"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["--arg1", "-a", "--arg2", "-b"],
            program: undefined,
            command: undefined,
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 0,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-a",
                    index: 1,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "--arg2",
                    index: 2,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-b",
                    index: 3,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: undefined
        });
    });

    // 7. args === ["--arg1", "-a", "command", "--arg2", "-b"]
    test("Should be correct: --arg1 -a command --arg2 -b", (): void => {
        const args = ["--arg1", "-a", "command", "--arg2", "-b"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["--arg1", "-a", "command", "--arg2", "-b"],
            program: undefined,
            command: { baseValue: "command", index: 2 },
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 0,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-a",
                    index: 1,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg2",
                    index: 3,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "-b",
                    index: 4,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ]
        });
    });

    // 8. args === ["program", "command"]
    test("Should be correct: program command", (): void => {
        const args = ["program", "command"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "command"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 1 },
            programArgs: undefined,
            commandArgs: undefined
        });
    });

    // 9. args === ["program"]
    test("Should be correct: program", (): void => {
        const args = ["program"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program"],
            program: { baseValue: "program", index: 0 },
            command: undefined,
            programArgs: undefined,
            commandArgs: undefined
        });
    });

    // 10. args === ["program", "--arg1", "--arg2", "command", "--arg3", "--arg4"]
    test("Should be correct: program --arg1 --arg2 command --arg3 --arg4", (): void => {
        const args = ["program", "--arg1", "--arg2", "command", "--arg3", "--arg4"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg1", "--arg2", "command", "--arg3", "--arg4"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "--arg1",
                    index: 1,
                    hasValue: false,
                    name: "arg1",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "--arg2",
                    index: 2,
                    hasValue: false,
                    name: "arg2",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg3",
                    index: 4,
                    hasValue: false,
                    name: "arg3",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "--arg4",
                    index: 5,
                    hasValue: false,
                    name: "arg4",
                    values: [],
                    hasManyValues: false,
                    isAlias: false
                }
            ]
        });
    });

    // 11. args === ["program", "--arg1=value1", '--arg2="value1"', "command", "--arg3='value1'", "--arg4=`value1`"]
    test("Should be correct: program --arg1=value1 --arg2=\"value1\" command --arg3='value1' --arg4=`value1`", (): void => {
        const args = ["program", "--arg1=value1", "--arg2=\"value1\"", "command", "--arg3='value1'", "--arg4=`value1`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg1=value1", "--arg2=\"value1\"", "command", "--arg3='value1'", "--arg4=`value1`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "--arg1=value1",
                    index: 1,
                    hasValue: true,
                    name: "arg1",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "--arg2=\"value1\"",
                    index: 2,
                    hasValue: true,
                    name: "arg2",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: false
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg3='value1'",
                    index: 4,
                    hasValue: true,
                    name: "arg3",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: false
                },
                {
                    baseValue: "--arg4=`value1`",
                    index: 5,
                    hasValue: true,
                    name: "arg4",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: false
                }
            ]
        });
    });

    // 12. args === ["program", "--arg1=value1,value2", '--arg2="value1,value2"', "command", "--arg3='value1,value2'", "--arg4=`value1,value2`"]
    test("Should be correct: program --arg1=value1,value2 --arg2=\"value1,value2\" command --arg3='value1,value2' --arg4=`value1,value2`", (): void => {
        const args = ["program", "--arg1=value1,value2", "--arg2=\"value1,value2\"", "command", "--arg3='value1,value2'", "--arg4=`value1,value2`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg1=value1,value2", "--arg2=\"value1,value2\"", "command", "--arg3='value1,value2'", "--arg4=`value1,value2`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "--arg1=value1,value2",
                    index: 1,
                    hasValue: true,
                    name: "arg1",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "--arg2=\"value1,value2\"",
                    index: 2,
                    hasValue: true,
                    name: "arg2",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg3='value1,value2'",
                    index: 4,
                    hasValue: true,
                    name: "arg3",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "--arg4=`value1,value2`",
                    index: 5,
                    hasValue: true,
                    name: "arg4",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                }
            ]
        });
    });

    // 13. args === ["program", '--arg2="value1, value2"', "command", "--arg3='value1, value2'", "--arg4=`value1, value2`"]
    test("Should be correct: program --arg2=\"value1, value2\" command --arg3='value1, value2' --arg4=`value1, value2`", (): void => {
        const args = ["program", "--arg2=\"value1, value2\"", "command", "--arg3='value1, value2'", "--arg4=`value1, value2`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "--arg2=\"value1, value2\"", "command", "--arg3='value1, value2'", "--arg4=`value1, value2`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 2 },
            programArgs: [
                {
                    baseValue: "--arg2=\"value1, value2\"",
                    index: 1,
                    hasValue: true,
                    name: "arg2",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                }
            ],
            commandArgs: [
                {
                    baseValue: "--arg3='value1, value2'",
                    index: 3,
                    hasValue: true,
                    name: "arg3",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "--arg4=`value1, value2`",
                    index: 4,
                    hasValue: true,
                    name: "arg4",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: false
                }
            ]
        });
    });

    // 14. args === ["program", "-a", "-b", "command", "-c", "-d"]
    test("Should be correct: program -a -b command -c -d", (): void => {
        const args = ["program", "-a", "-b", "command", "-c", "-d"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "-a", "-b", "command", "-c", "-d"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "-a",
                    index: 1,
                    hasValue: false,
                    name: "a",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-b",
                    index: 2,
                    hasValue: false,
                    name: "b",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "-c",
                    index: 4,
                    hasValue: false,
                    name: "c",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-d",
                    index: 5,
                    hasValue: false,
                    name: "d",
                    values: [],
                    hasManyValues: false,
                    isAlias: true
                }
            ]
        });
    });

    // 15. args === ["program", "-a=value1", '-b="value1"', "command", "-c='value1'", "-d=`value1`"]
    test("Should be correct: program -a=value1 -b=\"value1\" command -c='value1' -d=`value1`", (): void => {
        const args = ["program", "-a=value1", "-b=\"value1\"", "command", "-c='value1'", "-d=`value1`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "-a=value1", "-b=\"value1\"", "command", "-c='value1'", "-d=`value1`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "-a=value1",
                    index: 1,
                    hasValue: true,
                    name: "a",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-b=\"value1\"",
                    index: 2,
                    hasValue: true,
                    name: "b",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "-c='value1'",
                    index: 4,
                    hasValue: true,
                    name: "c",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-d=`value1`",
                    index: 5,
                    hasValue: true,
                    name: "d",
                    values: ["value1"],
                    hasManyValues: false,
                    isAlias: true
                }
            ]
        });
    });

    // 16. args === ["program", "-a=value1,value2", '-b="value1,value2"', "command", "-c='value1,value2'", "-d=`value1,value2`"]
    test("Should be correct: program -a=value1,value2 -b=\"value1,value2\" command -c='value1,value2' -d=`value1,value2`", (): void => {
        const args = ["program", "-a=value1,value2", "-b=\"value1,value2\"", "command", "-c='value1,value2'", "-d=`value1,value2`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "-a=value1,value2", "-b=\"value1,value2\"", "command", "-c='value1,value2'", "-d=`value1,value2`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 3 },
            programArgs: [
                {
                    baseValue: "-a=value1,value2",
                    index: 1,
                    hasValue: true,
                    name: "a",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                },
                {
                    baseValue: "-b=\"value1,value2\"",
                    index: 2,
                    hasValue: true,
                    name: "b",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "-c='value1,value2'",
                    index: 4,
                    hasValue: true,
                    name: "c",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                },
                {
                    baseValue: "-d=`value1,value2`",
                    index: 5,
                    hasValue: true,
                    name: "d",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                }
            ]
        });
    });

    // 17. args === ["program", '-a="value1, value2"', "command", "-b='value1, value2'", "-c=`value1, value2`"]
    test("Should be correct: program -a=\"value1,value2\" command -b='value1,value2' -c=`value1,value2`", (): void => {
        const args = ["program", "-a=\"value1,value2\"", "command", "-b='value1,value2'", "-c=`value1,value2`"];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDto>({
            baseArgs: ["program", "-a=\"value1,value2\"", "command", "-b='value1,value2'", "-c=`value1,value2`"],
            program: { baseValue: "program", index: 0 },
            command: { baseValue: "command", index: 2 },
            programArgs: [
                {
                    baseValue: "-a=\"value1,value2\"",
                    index: 1,
                    hasValue: true,
                    name: "a",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                }
            ],
            commandArgs: [
                {
                    baseValue: "-b='value1,value2'",
                    index: 3,
                    hasValue: true,
                    name: "b",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                },
                {
                    baseValue: "-c=`value1,value2`",
                    index: 4,
                    hasValue: true,
                    name: "c",
                    values: ["value1", "value2"],
                    hasManyValues: true,
                    isAlias: true
                }
            ]
        });
    });
});
