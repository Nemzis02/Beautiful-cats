import React from "react";

import { PreviewPost } from "components/presentational";

import avatar from "assets/images/avatar.jpg";
import exampleImage from "assets/images/example_image.jpg";

const tempPosts = [
  {
    id: 1,
    avatar,
    userName: "Valera",
    date: "10 Декабря 2019, 22:10",
    title: "Как все были пидорасы",
    article:
      "Labore aute voluptate adipisicing esse. Minim ea incididunt dolor laboris nisi officia. Minim ut voluptate amet anim. Eiusmod consequat sint Lorem ad Lorem occaecat ut excepteur aliqua aliqua. Et mollit labore anim commodo fugiat Lorem occaecat ea exercitation. Nostrud duis labore exercitation laboris nulla.",
    image: exampleImage
  },
  {
    id: 2,
    avatar,
    userName: "Леха",
    date: "20 Декабря 2019, 14:44",
    title: "Ебать дауны",
    article:
      "Labore aute voluptate adipisicing esse. Minim ea incididunt dolor laboris nisi officia. Minim ut voluptate amet anim. Eiusmod consequat sint Lorem ad Lorem occaecat ut excepteur aliqua aliqua. Et mollit labore anim commodo fugiat Lorem occaecat ea exercitation. Nostrud duis labore exercitation laboris nulla.",
    image: exampleImage
  },
  {
    id: 3,
    avatar,
    userName: "Max",
    date: "14 Декабря 2019, 08:21",
    title: "Как все обосрались",
    article:
      "Labore aute voluptate adipisicing esse. Minim ea incididunt dolor laboris nisi officia. Minim ut voluptate amet anim. Eiusmod consequat sint Lorem ad Lorem occaecat ut excepteur aliqua aliqua. Et mollit labore anim commodo fugiat Lorem occaecat ea exercitation. Nostrud duis labore exercitation laboris nulla.",
    image: exampleImage
  }
];

const Posts = () => {
  const posts = tempPosts.map(post => <PreviewPost key={post.id} {...post} />);
  return <div>{posts}</div>;
};

export default Posts;
