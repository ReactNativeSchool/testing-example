import React from "react";
import { render, waitForElement, debug } from "react-native-testing-library";
import renderer from "react-test-renderer";

import PostList from "../PostList.js";

test("renders a list of posts", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([{ id: 1, title: "1" }, { id: 2, title: "2" }])
  );
  const {
    queryAllByTestId,
    getAllByTestId,
    queryByTestId,
    getByTestId
  } = render(<PostList />);

  expect(queryByTestId("post-row-0")).toBeNull();

  await waitForElement(() => {
    return queryByTestId("post-row-0");
  });

  expect(getByTestId("post-row-0"));
});

test("renders a loading component initially", () => {
  const { getByTestId, queryAllByTestId } = render(<PostList />);
  expect(getByTestId("loading-message"));
});

test("render message that no results found if empty array returned", async () => {
  fetch.mockResponseOnce(JSON.stringify([]));
  const { getByTestId, queryAllByTestId } = render(<PostList />);

  await waitForElement(() => {
    return getByTestId("no-results");
  });

  expect(getByTestId("no-results"));
});

test("render error message if error thrown from api", async () => {
  fetch.mockRejectOnce(new Error("An error occurred."));
  const { getByTestId, queryAllByTestId, toJSON, getByText } = render(
    <PostList />
  );

  await waitForElement(() => {
    return getByTestId("error-message");
  });

  expect(getByText("An error occurred."));
});
