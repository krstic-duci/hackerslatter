import React, { FC } from "react";

import Col from "react-bootstrap/Col";

import karmaIcon from "../../images/karma-icon.png";

interface NewsUserProps {
  karma: number | undefined;
  name: string | undefined;
}

const NewsUser: FC<NewsUserProps> = ({ karma, name }) => {
  return (
    <Col lg={4} className="pt-lg-0 pt-3">
      <p>
        <img src={karmaIcon} alt="orange dharma wheel" /> {karma}
      </p>
      <p>by: {name}</p>
    </Col>
  );
};

export default NewsUser;
