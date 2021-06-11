import React, { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

import { fetchUsersAndStories, Response } from "../../api";

import NewsItem from "./NewsItem";
import NewsUser from "./NewsUser";

import styles from "../../styles/components/news/newslist.module.scss";

const NewsList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Response | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    fetchUsersAndStories()
      .then((result) => setData(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        Something went wrong, please try again later...
      </Alert>
    );
  }

  return (
    <main className={`${styles["newsList-wrapper"]} bg-white shadow p-4`}>
      <div className="d-flex justify-content-between flex-wrap">
        {data?.response.usersStories.map((elem) => (
          <section key={elem.id} className="col-12 p-3 my-3 border-bottom">
            <Row>
              <NewsItem
                title={elem.title}
                url={elem.url}
                time={elem.time}
                score={elem.score}
              />
              <NewsUser karma={elem.userKarma} name={elem.userId} />
            </Row>
          </section>
        ))}
      </div>
    </main>
  );
};

export default NewsList;
