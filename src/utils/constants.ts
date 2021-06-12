export const topStoriesUrl =
  "https://hacker-news.firebaseio.com/v0/topstories.json";
export const storyUrl = (id: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
export const userUrl = (id: string) =>
  `https://hacker-news.firebaseio.com/v0/user/${id}.json`;
