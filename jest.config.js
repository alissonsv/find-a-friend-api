/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  // paths map
  moduleNameMapper: {
    "#/tests/(.*)": "<rootDir>/tests/$1",
    "#/(.*)": "<rootDir>/src/$1",
  },
};