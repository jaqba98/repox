import { container } from "tsyringe";
import { BuildSimpleMessageService } from "@lib/logger";

const build = container.resolve(BuildSimpleMessageService);

export const messageInput = {
  messageSuccess: "Good job!",
  messageWarning: "Look here!",
  messageError: "Something is wrong!",
  messageInfo: "Hello world.",
  messageDefault: "Some message."
};

export const messageOutput = {
  messageSuccess: build.buildSuccess(messageInput.messageSuccess),
  messageWarning: build.buildWarning(messageInput.messageWarning),
  messageError: build.buildError(messageInput.messageError),
  messageInfo: build.buildInfo(messageInput.messageInfo),
  messageDefault: build.buildDefault(messageInput.messageDefault)
};
