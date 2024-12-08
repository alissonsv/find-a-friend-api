import baseConfig from "./jest.config";

export default {
	...baseConfig,
	testMatch: ["**/*.test.ts"],
	displayName: "e2e",
	globalSetup: "<rootDir>/tests/globalSetup.ts",
};
