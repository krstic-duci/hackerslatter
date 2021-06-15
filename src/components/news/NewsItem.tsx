import { VFC } from "react";

import Col from "react-bootstrap/Col";
import { format } from "date-fns";

import LazyImage from "common/LazyImage";

import type { NewsStories } from "./News.types";

import karmaIcon from "images/karma-icon.svg";
import newsImg from "images/news.png";

export interface NewsStoryProps {
  elem: NewsStories;
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
              <span className="font-italic text-muted mr-2">
                created at:{" "}
                {/* HN api returns seconds so that's why we have to multiply by 1000 */}
                {format(new Date(time * 1000), "MMM do yyyy - h:mm aaa")}
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
