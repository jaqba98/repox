import { container } from "tsyringe";

import {
  BuildSimpleMessageService
} from "../../src/lib/dom-service/build-simple-message.service";
import {
  WriteMessageService
} from "../../src/lib/infrastructure/write-message.service";
import { messageInput, messageOutput } from "../mock/message.mock";

describe("WriteMessageService tests", () => {
  let buildSimpleMessage: BuildSimpleMessageService;
  let writeMessage: WriteMessageService;

  beforeAll(() => {
    buildSimpleMessage = container.resolve(BuildSimpleMessageService);
    writeMessage = container.resolve(WriteMessageService);
  });

  afterAll(() => {
    container.reset();
    container.clearInstances();
  });

  test("should correctly success message", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    const success = buildSimpleMessage
      .buildSuccess(messageInput.messageSuccess);
    writeMessage.write(success);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const { calls } = consoleLogSpy.mock;
    expect(calls[0]).toEqual([messageOutput.messageSuccess]);
    consoleLogSpy.mockRestore();
  });

  test("should correctly warning message", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    const warning = buildSimpleMessage
      .buildWarning(messageInput.messageWarning);
    writeMessage.write(warning);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const { calls } = consoleLogSpy.mock;
    expect(calls[0]).toEqual([messageOutput.messageWarning]);
    consoleLogSpy.mockRestore();
  });

  test("should correctly error message", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    const error = buildSimpleMessage
      .buildError(messageInput.messageError);
    writeMessage.write(error);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const { calls } = consoleLogSpy.mock;
    expect(calls[0]).toEqual([messageOutput.messageError]);
    consoleLogSpy.mockRestore();
  });

  test("should correctly info message", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    const info = buildSimpleMessage
      .buildInfo(messageInput.messageInfo);
    writeMessage.write(info);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const { calls } = consoleLogSpy.mock;
    expect(calls[0]).toEqual([messageOutput.messageInfo]);
    consoleLogSpy.mockRestore();
  });

  test("should correctly default message", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    consoleLogSpy.mockImplementation(() => {});
    const defaultMessage = buildSimpleMessage
      .buildDefault(messageInput.messageDefault);
    writeMessage.write(defaultMessage);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    const { calls } = consoleLogSpy.mock;
    expect(calls[0]).toEqual([messageOutput.messageDefault]);
    consoleLogSpy.mockRestore();
  });
});
