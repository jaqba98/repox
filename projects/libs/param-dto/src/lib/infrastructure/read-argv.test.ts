import { container } from "tsyringe";
import { ReadArgvService } from "./read-argv.service";

describe("ReadArgvService", (): void => {
  const originalArgv: string[] = process.argv;

  afterAll((): void => {
    process.argv = originalArgv;
    container.clearInstances();
  });

  test("Should return the parameters given by user", (): void => {
    const service = container.resolve(ReadArgvService);
    const argv: string[] = [
      "node", "app", "program", "arg_1", "command", "alias_1"
    ];
    process.argv = [...argv];
    expect(service.getArgv()).toEqual([...argv]);
  });
});
