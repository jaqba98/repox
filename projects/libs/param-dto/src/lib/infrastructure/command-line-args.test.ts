import { container } from "tsyringe";

import { CommandLineArgsService } from "./command-line-args.service";
import { deepCopy } from "@lib/utils";

describe("CommandLineArgsService", (): void => {
    let service: CommandLineArgsService;
    let oldProcessArgv: string[];

    beforeAll((): void => {
        service = container.resolve(CommandLineArgsService);
        oldProcessArgv = deepCopy(process.argv);
    });

    afterAll((): void => {
        container.reset();
        container.clearInstances();
        process.argv = deepCopy(oldProcessArgv);
    });

    test("Should return user arguments correctly", (): void => {
        process.argv = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
        expect(service.getUserArgs()).toEqual(["a3", "a4", "a5", "a6", "a7"]);
    });

    test("Should return empty array", (): void => {
        process.argv = ["a1", "a2"];
        expect(service.getUserArgs()).toEqual([]);
    });
});
