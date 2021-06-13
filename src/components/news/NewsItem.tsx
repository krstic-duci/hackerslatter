import React, { VFC } from "react";

import Col from "react-bootstrap/Col";
import { format } from "date-fns";

import type { Story } from "api";

import karmaIcon from "images/karma-icon.svg";
import newsImg from "images/news.png";

import LazyImage from "common/LazyImage";

export interface UsersStories extends Story {
  userId: string;
  userKarma?: number | undefined;
}

export interface NewsStoryProps {
  elem: UsersStories;
}

const NewsStory: VFC<NewsStoryProps> = ({
  elem: { score, title, time, url, userId, userKarma }
}) => {
  return (
    <>
      <Col lg={9}>
        <div className="d-flex">
          <span className="mr-3 text-monospace font-italic border-right border-top">
            {score}
          </span>

          <div>
            {/* Title */}
            <p className="mb-1 h5">{title}</p>

            <p className="d-flex flex-wrap">
              {/* TODO: check the time, something is fishy here */}
              <span className="font-italic text-muted mr-2">
                created at:{" "}
                {format(new Date(time), "MMM do yyyy - HH:mm:ss aaa")}
              </span>

              {/* User name */}
              <span title={userId ?? "Anonymous"} className="underline-text">
                by: {userId ?? "Anonymous"}
              </span>
            </p>
            {/* User karma */}
            {userKarma && (
              <p>
                <img
                  src={karmaIcon}
                  alt="orange dharma wheel"
                  width="32"
                  height="32"
                />
                <span className="ml-2">{userKarma}</span>
              </p>
            )}
          </div>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            data-testid="urlLink"
          >
            Check the story &gt;
          </a>
        )}
      </Col>

      <Col lg={3} className="text-lg-left text-center">
        <LazyImage
          imgSrc={newsImg}
          imgAlt="news article"
          imgWidth={100}
          imgHeight={100}
          effect="blur"
        />
      </Col>
    </>
  );
};

export default NewsStory;
