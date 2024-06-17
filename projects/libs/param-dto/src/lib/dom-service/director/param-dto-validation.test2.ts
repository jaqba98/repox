/* eslint-disable max-lines */
import { container } from "tsyringe";

import { ParamDtoValidationDirector } from "./param-dto-validation.director";
import {
    ProgramValidationBuilder
} from "../builder/param-dto-validation/program-validation.builder";
import { ParamDtoDirector } from "./param-dto.director";
import { ParamDtoBuilder } from "../builder/param-dto/param-dto.builder";
import {
    ProgramArgsValidationBuilder
} from "../builder/param-dto-validation/program-args-validation.builder";
import {
    CommandValidationBuilder
} from "../builder/param-dto-validation/command-validation.builder";
import {
    CommandArgsValidationBuilder
} from "../builder/param-dto-validation/command-args-validation.builder";

describe.skip("ParamDtoValidationDirector", (): void => {
    let dtoService = container.resolve(ParamDtoDirector);

    let valService = container.resolve(ParamDtoValidationDirector);

    beforeEach((): void => {
        dtoService = container.resolve(ParamDtoDirector);
        valService = container.resolve(ParamDtoValidationDirector);
    });

    afterEach((): void => {
        container.reset();
        container.clearInstances();
    });

    describe("Supported signs", (): void => {
        describe("Supported signs - Program", (): void => {
            test("Should be correct when program is undefined", (): void => {
                const args = ["--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should be correct when program contains only supported signs", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should not be correct when program contains not supported signs", (): void => {
                const args = ["p@#ro$#g%ram", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.supportedSigns).not.toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([0]);
            });
        });

        describe("Supported signs - Program args", (): void => {
            test("Should be correct when program args are undefined", (): void => {
                const args = ["program", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args contain only supported signs", (): void => {
                const args = ["program", "--arg1", "--arg2=\"../../../node\"", "command", "--arg3"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should not be correct when program args contain not supported signs", (): void => {
                const args = ["program", "--arg##1", "--a@$rg2=\"../../../node\"", "command", "--arg3"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).not.toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([1, 2]);
            });
        });

        describe("Supported signs - Command", (): void => {
            test("Should be correct when command is undefined", (): void => {
                const args = ["program", "--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should be correct when command contains only supported signs", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should not be correct when command contains not supported signs", (): void => {
                const args = ["program", "--arg1", "co$$m#$@mand", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.supportedSigns).not.toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([2]);
            });
        });

        describe("Supported signs - Command args", (): void => {
            test("Should be correct when command args are undefined", (): void => {
                const args = ["program", "--arg1", "command"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should be correct when command args contain only supported signs", (): void => {
                const args = ["program", "arg1", "command", "--arg2", "--arg3=\"../../../node\""];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([]);
            });

            test("Should not be correct when command args contain not supported signs", (): void => {
                const args = ["program", "--arg1", "command", "--arg##2", "--a@$rg3=\"../../../node\""];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.supportedSigns).not.toBeTruthy();
                expect(result.supportedSignsWrongIndexes).toEqual([3, 4]);
            });
        });
    });

    describe("Correct Pattern", (): void => {
        describe("Correct Pattern - Program", (): void => {
            test("Should be correct when program is undefined", (): void => {
                const args = ["--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should be correct when program has correct pattern", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should not be correct when program has incorrect pattern", (): void => {
                const args = ["22program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.correctPattern).not.toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([0]);
            });
        });

        describe("Correct Pattern - Program args", (): void => {
            test("Should be correct when program args are undefined", (): void => {
                const args = ["program", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args has correct pattern", (): void => {
                const args = ["program", "--arg1", "--arg=\"test\"", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should not be correct when program args has incorrect pattern", (): void => {
                const args = ["program", "-arg1", "-aaa\"test\"", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctPattern).not.toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([1, 2]);
            });
        });

        describe("Correct Pattern - Command", (): void => {
            test("Should be correct when command is undefined", (): void => {
                const args = ["program", "--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should be correct when command has correct pattern", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should not be correct when command has incorrect pattern", (): void => {
                const args = ["program", "--arg1", "22command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.correctPattern).not.toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([2]);
            });
        });

        describe("Correct Pattern - Command args", (): void => {
            test("Should be correct when command args are undefined", (): void => {
                const args = ["program", "--arg1", "command"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should be correct when command args has correct pattern", (): void => {
                const args = ["program", "--arg1", "command", "--arg2", "--arg3=\"test\""];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.correctPattern).toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([]);
            });

            test("Should not be correct when command args has incorrect pattern", (): void => {
                const args = ["program", "--arg1", "command", "-arg1", "-aaa\"test\""];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.correctPattern).not.toBeTruthy();
                expect(result.correctPatternWrongIndexes).toEqual([3, 4]);
            });
        });
    });

    describe("Can Exist", (): void => {
        describe("Can Exist - Program", (): void => {
            test("Should be correct when program is undefined", (): void => {
                const args = ["--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });

            test("Should be correct when program is defined", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });
        });

        describe("Can Exist - Program args", (): void => {
            test("Should be correct when program args are undefined", (): void => {
                const args = ["program", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args are defined", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });
        });

        describe("Can Exist - Command", (): void => {
            test("Should be correct when command is undefined", (): void => {
                const args = ["program", "--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });

            test("Should be correct when program exist", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });

            test("Should not be correct when program not exist", (): void => {
                const args = ["--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.canExist).not.toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([1]);
            });
        });

        describe("Can Exist - Command args", (): void => {
            test("Should be correct when command args are undefined", (): void => {
                const args = ["program", "--arg1", "command"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });

            test("Should be correct when command exist", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.canExist).toBeTruthy();
                expect(result.canExistWrongIndexes).toEqual([]);
            });
        });
    });

    describe("Correct Order", (): void => {
        describe("Correct Order - Program", (): void => {
            test("Should be correct when program is undefined", (): void => {
                const args = ["--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when program index is equal 0", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });
        });

        describe("Correct Order - Program args", (): void => {
            test("Should be correct when program args arg undefined", (): void => {
                const args = ["program", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args are between program and command", (): void => {
                const args = ["program", "--arg1", "--arg2", "command", "--arg3"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args are after the command when command does not exist", (): void => {
                const args = ["program", "--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when program args indexes starts from 0 when program does not exist", (): void => {
                const args = ["--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(ProgramArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });
        });

        describe("Correct Order - Command", (): void => {
            test("Should be correct when command is undefined", (): void => {
                const args = ["program", "--arg1", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when command is after program", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });
        });

        describe("Correct Order - Command args", (): void => {
            test("Should be correct when command args arg undefined", (): void => {
                const args = ["program", "--arg1", "command"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });

            test("Should be correct when command args are after command", (): void => {
                const args = ["program", "--arg1", "command", "--arg2"];
                const paramDto = dtoService.build(ParamDtoBuilder, args);
                const result = valService.build(CommandArgsValidationBuilder, paramDto);
                expect(result.correctOrder).toBeTruthy();
                expect(result.correctOrderWrongIndexes).toEqual([]);
            });
        });
    });
});
