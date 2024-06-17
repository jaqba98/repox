// TODO: Fix the jest configuration
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["reflect-metadata"],
  testMatch: ["**/*.(spec|test).ts"]
};
