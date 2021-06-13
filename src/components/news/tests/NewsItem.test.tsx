import React from "react";
import { render, screen } from "@testing-library/react";
import NewsItem, { NewsStoryProps } from "../NewsItem";
import "@testing-library/jest-dom/extend-expect";

describe("News item component", () => {
  const dummyElem: NewsStoryProps = {
    elem: {
      by: "testName",
      descendants: 1,
      id: 123,
      kids: [1, 2],
      score: 12,
      time: 12345,
      title: "testTitle",
      type: "testType",
      url: "",
      userId: "testUserId",
      userKarma: undefined
    }
  };

  it("should not print user url link", () => {
    render(<NewsItem elem={dummyElem.elem} />);

    expect(screen.queryByTestId("urlLink")).not.toBeInTheDocument();
  });

  it("should not print user karma", () => {
    render(<NewsItem elem={dummyElem.elem} />);

    expect(screen.queryByAltText(/orange dharma/g)).not.toBeInTheDocument();
  });
});
