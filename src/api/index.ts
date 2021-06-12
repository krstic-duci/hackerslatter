import { storyUrl, topStoriesUrl, userUrl } from "utils/constants";

import type { UsersStories } from "components/news/NewsItem";

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

interface User {
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface Response {
  response: {
    usersStories: UsersStories[];
  };
}

// TODO: Can I optimize this a little better? Maybe useCallback() or useMemo()
// Maybe even I can break this function apart...
// Better type system maybe
export async function fetchUsersAndStories() {
  try {
    // 1. Fetch the list of unique ids
    const itemsIds = await fetch(topStoriesUrl).then((res) => res.json());

    // 2. Take the first 10 items in array,
    //    go through each one, and
    //    call the API for fetching the news item
    const itemsPromises = itemsIds
      .slice(0, 10)
      .map((id: number): Promise<Story> => fetchStory(id));

    // 3. Since we are getting an array of Promises
    //    wait for the result of news item
    const items: Story[] = await Promise.all(itemsPromises);

    // 4. Go through the news list,
    //    and call the users API
    const usersPromises = items.map(
      (user): Promise<User> => fetchUser(user.by)
    );

    // 5. Since we are getting an array of Promises
    //    wait for the result of users
    const users: User[] = await Promise.all(usersPromises);

    // 6. In order to prepare single source of truth,
    //    i.e look for UsersStories interface, add user id and user karma
    //    to the Story interface. That means combine everything
    //    from Story interface and add userId and userKarma
    const usersStories: UsersStories[] = items.map((story: any, i) => {
      return { ...story, userId: users[i].id, userKarma: users[i].karma };
    });

    // 7. We need the ascending order
    usersStories.sort((a, b) => a.score - b.score);

    return {
      response: {
        usersStories
      }
    };
  } catch (e) {
    console.error(`Cannot fetch user stories :( ${e}`);
  }
}

// TODO: Maybe these functions below can become a generic one
async function fetchStory(id: number) {
  try {
    const response = await fetch(storyUrl(id));
    const result = response.json();
    return result;
  } catch (e) {
    console.error(`Cannot fetch a story ${e}`);
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
