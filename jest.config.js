// jest.config.js
module.exports = {
    testMatch: ["**/?(*.)+(test).ts?(x)"], // matches *.test.ts or *.spec.ts anywhere
    // OR more targeted:
    // testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
  };
  