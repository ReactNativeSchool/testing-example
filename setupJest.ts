import { GlobalWithFetchMock } from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;

// https://github.com/expo/expo/issues/2806
// jest.mock("ScrollView", () => require.requireMock("ScrollViewMock"));
