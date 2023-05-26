import { container } from "tsyringe";
import { ReadArgvService } from "../read-argv.service";

describe("ReadArgvService", () => {
  const child = container.createChildContainer();
  const service = child.resolve(ReadArgvService);
  const originalArgv = process.argv;

  afterEach(() => {
    process.argv = originalArgv;
  });

  afterAll(() => {
    child.clearInstances();
  })

  test("Should return the correct parameters given by user", () => {
    const argv: Array<string> = [
      "node",
      "application",
      "program",
      "argument_1",
      "argument_2",
      "argument_3",
      "command",
      "alias_1",
      "alias_2",
      "alias_3"
    ];
    process.argv = [...argv];
    expect(service.getArgv()).toEqual([...argv]);
  });
});
