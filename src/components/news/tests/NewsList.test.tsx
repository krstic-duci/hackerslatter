import { render, screen, act, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";

import NewsList from "../NewsList";
import type { News, User } from "../News.types";

describe("News List component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fail fetching data", async () => {
    fetchMock.mockRejectOnce(() => Promise.reject("App crashed"));

    act(() => {
      render(<NewsList />);
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("should call HN api for top stories, items and users", async () => {
    const testItemsIds: number[] = [1, 2];
    const testItems1: News = {
      by: "testUser1",
      descendants: 11,
      id: 1,
      kids: [1, 2],
      score: 43,
      time: 1623693620,
      title: "testTitle1",
      type: "story",
      url: "testUrl1"
    };
    const testItems2: News = {
      by: "testUser2",
      descendants: 22,
      id: 2,
      kids: [3, 4],
      score: 69,
      time: 1623698713,
      title: "testTitle2",
      type: "story",
      url: "testUrl2"
    };
    const testUsers1: User = {
      created: 1623693620,
      id: "testUser1",
      karma: 1,
      submitted: [1, 2]
    };
    const testUsers2: User = {
      created: 1623698713,
      id: "testUser2",
      karma: 2,
      submitted: [1, 2]
    };

    fetchMock.mockResponses(
      [JSON.stringify(testItemsIds), { status: 200 }],
      [JSON.stringify(testItems1), { status: 200 }],
      [JSON.stringify(testItems2), { status: 200 }],
      [JSON.stringify(testUsers1), { status: 200 }],
      [JSON.stringify(testUsers2), { status: 200 }]
    );

    act(() => {
      render(<NewsList />);
    });

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("items")).toHaveLength(2);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("should return no items div", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    act(() => {
      render(<NewsList />);
    });

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("noItems")).toBeInTheDocument();
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
