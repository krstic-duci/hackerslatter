import { storyUrl, topStoriesUrl, userUrl } from "../utils/apiUrls";

export interface Story {
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
    stories: Story[];
    users: User[];
  };
}

// TODO: Can I optimize this a little better? Maybe useCallback() or useMemo()
export async function fetchUsersAndStories() {
  try {
    // 1.
    const storiesIds = await fetch(topStoriesUrl).then((res) => res.json());

    // 2.
    const storiesPromises = storiesIds
      .slice(0, 10)
      .map((id: number): Promise<Story> => fetchStory(id));

    // 3.
    const stories: Story[] = await Promise.all(storiesPromises);

    // 4.
    const usersPromises = stories.map((user) => fetchUser(user.by));

    // 5.
    const users: User[] = await Promise.all(usersPromises);

    // 6.
    stories.sort((a, b) => a.score - b.score);

    console.log(users);

    return {
      response: {
        stories,
        users,
      },
    };
  } catch (e) {
    console.error(`Cannot fetch stories Id ${e}`);
  }
}

async function fetchStory(id: number) {
  try {
    const response = await fetch(storyUrl(id));
    const result = response.json();
    return result;
  } catch (e) {
    console.error(`Cannot fetch story ${e}`);
  }
}

async function fetchUser(id: string) {
  try {
    const response = await fetch(userUrl(id));
    const result = response.json();
    return result;
  } catch (e) {
    console.error(`Cannot fetch user ${e}`);
  }
}
