import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Post } from 'components/presentational';
import { POST } from 'apollo/queries';
import { getDateString } from 'utils/utils';
import avatar from 'assets/images/avatar.jpg';

import styles from './PostPage.module.scss';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string
    })
  })
};

const PostPage = ({ match }) => {
  const { postId } = match.params;
  const { data, loading } = useQuery(POST, {
    variables: { id: postId }
  });

  const post = { ...pathOr({}, ['post'], data) };

  if (!post.user) {
    post.user = { avatar };
  }

  if (post) {
    post.createdAt = getDateString(post.createdAt);
  }

  if (loading) return <h1>Loading</h1>;
  return (
    <main className={styles.container}>
      <Post {...post} isAllArticleDisplay />
    </main>
  );
};

PostPage.propTypes = propTypes;

export default withRouter(PostPage);
