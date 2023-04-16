import { container } from "tsyringe";
import { ReadProcessArgvService } from "../read-process-argv.service";

/** Testing of the ReadProcessArgvService service. */

describe("ReadProcessArgvService", () => {
  const argv = ["node", "application", "program", "command"];
  const readProcessArgv = container.resolve(ReadProcessArgvService);
  const originalArgv = process.argv;

  beforeAll(() => {
    process.argv = argv;
  });

  afterAll(() => {
    process.argv = originalArgv;
  });

  test("Should return the correct parameters given by user", () => {
    expect(readProcessArgv.getArgv()).toEqual(argv);
  });
});
