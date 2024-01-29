import {container} from "tsyringe";

import {ParamDtoDirector} from "./param-dto.director";
import {ParamDtoBuilder} from "../builder/param-dto/param-dto.builder";
import {ParamDtoDomain} from "../domain/param-dto.domain";

describe("ParamDtoDirector", (): void => {
    let service: ParamDtoDirector;

    beforeAll((): void => {
        service = container.resolve(ParamDtoDirector);
    });

    afterAll((): void => {
        container.reset();
        container.clearInstances();
    });

    test("Should return everything undefined if the args are undefined", (): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const args: any = undefined;
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDtoDomain>({
            baseArgs: undefined,
            program: undefined,
            command: undefined,
            programArgs: undefined,
            commandArgs: undefined
        });
    });

    test("Should return correct the param dto object if args are correct", (): void => {
        const args = [
            "program",
            "--arg1",
            "-a",
            "command",
            "--arg2=test1,test2",
            '--arg3="test1,test2"',
            "--arg4='test1,test2'",
            "--arg5=`test1,test2`",
            "-b=test1",
            '-c="test1"',
            "-d='test1'",
            "-e=`test1`"
        ];
        expect(service.build(ParamDtoBuilder, args)).toEqual<ParamDtoDomain>({
            baseArgs: [
                "program",
                "--arg1",
                "-a",
                "command",
                "--arg2=test1,test2",
                '--arg3="test1,test2"',
                "--arg4='test1,test2'",
                "--arg5=`test1,test2`",
                "-b=test1",
                '-c="test1"',
                "-d='test1'",
                "-e=`test1`"
            ],
            program: {baseValue: "program", index: 0},
            command: {baseValue: "command", index: 3},
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
                    baseValue: "--arg2=test1,test2",
                    index: 4,
                    hasValue: true,
                    name: "arg2",
                    values: ["test1", "test2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: '--arg3="test1,test2"',
                    index: 5,
                    hasValue: true,
                    name: "arg3",
                    values: ["test1", "test2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "--arg4='test1,test2'",
                    index: 6,
                    hasValue: true,
                    name: "arg4",
                    values: ["test1", "test2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "--arg5=`test1,test2`",
                    index: 7,
                    hasValue: true,
                    name: "arg5",
                    values: ["test1", "test2"],
                    hasManyValues: true,
                    isAlias: false
                },
                {
                    baseValue: "-b=test1",
                    index: 8,
                    hasValue: true,
                    name: "b",
                    values: ["test1"],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: '-c="test1"',
                    index: 9,
                    hasValue: true,
                    name: "c",
                    values: ["test1"],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-d='test1'",
                    index: 10,
                    hasValue: true,
                    name: "d",
                    values: ["test1"],
                    hasManyValues: false,
                    isAlias: true
                },
                {
                    baseValue: "-e=`test1`",
                    index: 11,
                    hasValue: true,
                    name: "e",
                    values: ["test1"],
                    hasManyValues: false,
                    isAlias: true
                }
            ]
        });
    });
});
