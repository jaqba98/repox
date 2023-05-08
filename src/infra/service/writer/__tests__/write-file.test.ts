import { container } from "tsyringe";
import { WriteFile } from "../write-file";
import { existsSync, readFileSync, unlinkSync } from "fs";

interface TJsonContent {
  hello: string;
}

describe("WriteFileService", () => {
  const path: string = "test.json";
  const content: TJsonContent = { hello: "Hello" };
  const writeFile = container.resolve(WriteFile);

  beforeEach(() => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });

  afterAll(() => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });

  test("Should correctly save json data to file", () => {
    writeFile.writeJsonFile<TJsonContent>(path, content);
    const dataFromFile = JSON.parse(readFileSync(path, "utf-8"));
    expect(dataFromFile).toEqual(content);
  });
});
