import React, { FC } from "react";

import Col from "react-bootstrap/Col";

import { Story } from "../../api";

interface NewsStoryProps {
  story: Story;
}
const NewsStory: FC<NewsStoryProps> = ({
  story: { title, url, time, score },
}) => {
  return (
    <Col xs={7}>
      <p>{title}</p>
      <a href={url} target="_blank" rel="noreferrer noopener">
        Check the story &gt;
      </a>
      <p>{new Date(time).toLocaleTimeString()}</p>
      <p>{score}</p>
    </Col>
  );
};

export default NewsStory;
