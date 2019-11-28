import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { pathOr, clone } from 'ramda';

import { Post } from 'components/presentational';
import { getDateString } from 'utils/utils';
import { POSTS } from 'apollo/queries';

import avatar from 'assets/images/avatar.jpg';

const Posts = () => {
  const { data } = useQuery(POSTS);
  console.log(data)
  const posts = clone(pathOr([], ['posts'], data)).map(post => {
    post.createdAt = getDateString(post.createdAt);
    return post.user ? post : { ...post, user: { avatar } };
  });

  const renderPosts = posts.map(post => (
    <Post key={post._id} {...post} isReadButtonDisplay />
  ));
  return <div>{renderPosts}</div>;
};

export default Posts;
