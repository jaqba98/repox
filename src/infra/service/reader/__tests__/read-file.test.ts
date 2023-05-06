import { container, DependencyContainer } from "tsyringe";
import { ReadFile } from "../read-file";
import { existsSync, unlinkSync, writeFileSync } from "fs";

describe("ReadFile - read json", () => {
  interface JsonModel {
    hello: string;
  }

  const path: string = "read-file.test.json";
  const content: JsonModel = { hello: "Hello" };
  const child: DependencyContainer = container.createChildContainer();
  const service: ReadFile = child.resolve(ReadFile);

  beforeEach(() => {
    if (existsSync(path)) unlinkSync(path);
  });

  afterAll(() => {
    if (existsSync(path)) unlinkSync(path);
    container.clearInstances();
  });

  test("Should be correct when the file exist", () => {
    writeFileSync(path, JSON.stringify(content, null, 2), "utf-8");
    expect(service.readJsonFile<JsonModel>(path)).toEqual(content);
  });

  test("Should be incorrect when the file not exist", () => {
    expect(() => service.readJsonFile(path)).toThrow(Error);
  });
});
