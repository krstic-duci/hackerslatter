import React, { FC } from "react";

import Col from "react-bootstrap/Col";

import { Story } from "../../api";

type NewsStoryProps = Omit<
  Story,
  "by" | "descendants" | "id" | "kids" | "type"
>;

const NewsStory: FC<NewsStoryProps> = ({ title, url, time, score }) => {
  return (
    <Col lg={8}>
      <div className="d-flex">
        <span className="mr-3 text-monospace font-italic border-right border-top">
          {score}
        </span>
        <div>
          <p className="font-weight-bold mb-1 h4">{title}</p>
          <p className="font-italic text-muted">
            {/* TODO: check the time, something is fishy here */}
            created at: {new Date(time).toLocaleTimeString()}
          </p>
        </div>
      </div>
      {url && (
        <a href={url} target="_blank" rel="noreferrer noopener">
          Check the story &gt;
        </a>
      )}
    </Col>
  );
};

export default NewsStory;
