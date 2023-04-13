import { ReadFileService } from "../read-file.service";
import { container } from "tsyringe";
import { existsSync, unlinkSync, writeFileSync } from "fs";

interface JsonModel {
  hello: string;
}

describe("ReadFileService", () => {
  const path: string = "test.json";
  const content: JsonModel = { hello: "Hello" };
  const readFile = container.resolve(ReadFileService);

  beforeEach(() => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });

  test("Should be correct when the file exist", () => {
    writeFileSync(path, JSON.stringify(content, null, 2), "utf-8");
    expect(readFile.readJsonFile<JsonModel>(path)).toEqual(content);
  });

  test("Should be incorrect when the file not exist", () => {
    expect(() => readFile.readJsonFile(path)).toThrow(Error);
  });
});
