global.fetch = require("jest-fetch-mock");

// https://github.com/expo/expo/issues/2806
jest.mock("ScrollView", () => require.requireMock("ScrollViewMock"));
