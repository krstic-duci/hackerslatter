import { itemUrl, topStoriesUrl, userUrl } from "utils/constants";

import type { NewsStories } from "components/news/NewsItem";

export interface News {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface User {
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface Response {
  response: {
    newsStories: NewsStories[];
  };
}

export async function fetchUsersAndStories() {
  try {
    // 1. Fetch the list of unique ids
    const newsIds: number[] = await fetch(topStoriesUrl).then((res) =>
      res.json()
    );

    // 2. Take the first 10 items in array,
    //    go through each one, and
    //    call the API for fetching the news item
    const newsPromises = newsIds
      .slice(0, 10)
      .map((id: number): Promise<News> => fetchItem(id));

    // 3. Since we are getting an array of Promises
    //    wait for the result of news item
    const news: News[] = await Promise.all(newsPromises);

    // 4. Go through the news list,
    //    and call the users API
    const usersPromises = news.map((user): Promise<User> => fetchUser(user.by));

    // 5. Since we are getting an array of Promises
    //    wait for the result of users
    const users: User[] = await Promise.all(usersPromises);

    // 6. In order to prepare single source of truth, add user id and user karma
    const newsStories: NewsStories[] = news.map((story: News, i) => {
      return { ...story, userId: users[i].id, userKarma: users[i].karma };
    });

    // 7. We need the ascending order
    newsStories.sort((a, b) => a.score - b.score);

    return {
      response: {
        newsStories
      }
    };
  } catch {
    return Promise.reject("Cannot fetch stories");
  }
}

export async function fetchItem(id: number) {
  try {
    const response = await fetch(itemUrl(id));
    const result = response.json();
    return result;
  } catch {
    return Promise.reject("Cannot fetch story");
  }
}

export async function fetchUser(id: string) {
  try {
    const response = await fetch(userUrl(id));
    const result = response.json();
    return result;
  } catch {
    return Promise.reject("Cannot fetch user");
  }
}
