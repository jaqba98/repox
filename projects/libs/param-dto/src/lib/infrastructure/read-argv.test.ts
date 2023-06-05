import { container } from "tsyringe";
import { ReadArgvService } from "./read-argv.service";

describe("ReadArgvService", () => {
  const originalArgv: Array<string> = process.argv;

  afterAll(() => {
    process.argv = originalArgv;
    container.clearInstances();
  });

  test("Should return the correct parameters given by user", () => {
    const service = container.resolve(ReadArgvService);
    const argv: Array<string> = [
      "node", "app", "program", "arg_1", "command", "alias_1"
    ];
    process.argv = [...argv];
    expect(service.getArgv()).toEqual([...argv]);
  });
});
