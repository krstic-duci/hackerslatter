import React, { FC } from "react";

import Col from "react-bootstrap/Col";

interface NewsUserProps {
  karma: number;
}

const NewsUser: FC<NewsUserProps> = ({ karma }) => {
  return (
    <Col xs={5}>
      <p>{karma}</p>
    </Col>
  );
};

export default NewsUser;
