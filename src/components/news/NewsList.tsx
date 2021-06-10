import React, { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

// import useRequest from "../../hooks/useRequest";
// import { topStoriesUrl } from "../../utils/apiUrls";
import { fetchUsersAndStories, Response } from "../../api";

import NewsItem from "./NewsItem";
import NewsUser from "./NewsUser";

import styles from "../../styles/components/news/newslist.module.scss";

const NewsList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Response | undefined>(undefined);
  // const { data, error, loading } = useRequest(topStoriesUrl);

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
      {data?.response.stories.map((story) => (
        <NewsItem key={story.id} story={story} />
      ))}
      {data?.response.users.map((user) => {
        if (!user) {
          return <p key="randomKey">No data</p>;
        }
        return <NewsUser key={user.id} karma={user.karma} />;
      })}
    </main>
  );
};

export default NewsList;
