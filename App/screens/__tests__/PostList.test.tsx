import React from "react";
import {
  render,
  waitForElement,
  fireEvent
} from "react-native-testing-library";

import PostList, { PostRow } from "../PostList";

describe("PostList", () => {
  test("renders a loading component initially", () => {
    const { getByTestId } = render(<PostList />);
    expect(getByTestId("loading-message"));
  });

  test("render message that no results found if empty array returned", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    const { getByTestId } = render(<PostList />);

    await waitForElement(() => {
      return getByTestId("no-results");
    });

    expect(getByTestId("no-results"));
  });

  test("renders a list of posts", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ id: 1, title: "1" }, { id: 2, title: "2" }])
    );
    const { queryByTestId, getByTestId } = render(<PostList />);

    expect(queryByTestId("post-row-0")).toBeNull();

    await waitForElement(() => {
      return queryByTestId("post-row-0");
    });

    expect(getByTestId("post-row-0"));
  });

  test("render error message if error thrown from api", async () => {
    fetchMock.mockRejectOnce(new Error("An error occurred."));
    const { getByTestId, toJSON, getByText } = render(<PostList />);

    await waitForElement(() => {
      return getByTestId("error-message");
    });

    expect(getByText("An error occurred."));
  });
});

describe("PostRow", () => {
  test("is tappable", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <PostRow index={0} item={{ title: "Test", id: 0 }} onPress={onPress} />
    );

    fireEvent.press(getByText("Test"));
    expect(onPress).toHaveBeenCalled();
  });
});
