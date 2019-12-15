import React, { useState } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { pathOr, clone } from 'ramda';

import { Post, CommentForm } from 'components/presentational';
import { Comment } from 'components/containers';
import { POST, USER } from 'apollo/queries';
import { ADD_COMMENT } from 'apollo/mutations';
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
  useQuery(USER, {
    onCompleted: data => {
      const { userName } = data.user;
      setFormData({ userName });
    }
  });
  const [formData, setFormData] = useState({});
  const { data, loading, error } = useQuery(POST, {
    variables: { id: postId }
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    update: (store, { data: { addComment } }) => {
      const data = store.readQuery({ query: POST, variables: { id: postId } });
      data.post.comments = [...data.post.comments, addComment];
      store.writeQuery({ query: POST, data, variables: { id: postId } });
    },
    variables: {
      id: postId
    },
    onCompleted: () => {
      setFormData({});
    }
  });

  const onCommentFormSubmit = () => {
    addComment({
      variables: {
        text: formData.comment,
        author: formData.userName,
        post: postId
      }
    });
  };

  const onCommentFromChange = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const post = { ...pathOr({}, ['post'], data) };
  const comments = clone(pathOr([], ['comments'], post));

  if (Object.keys(post).length && !post.user) {
    post.user = { avatar };
  }

  if (Object.keys(post).length && post) {
    post.createdAt = getDateString(post.createdAt);
  }

  comments.map(comment => {
    comment.createdAt = getDateString(comment.createdAt);
    if (!comment.user) {
      comment.user = { avatar };
    }

    comment.replies.map(reply => {
      reply.createdAt = getDateString(reply.createdAt);
      if (!reply.user) {
        reply.user = { avatar };
      }
      return reply;
    });

    return comment;
  });

  const title = comments.length
    ? 'Комментарии:'
    : 'Оставьте свой комментарий первым!';

  if (loading) return <h1>Loading</h1>;
  if (error || !data || !Object.keys(post).length)
    return <h1>Something went wrong</h1>;
  return (
    <main className={styles.container}>
      <Post {...post} isAllArticleDisplay />
      <section className={styles.commentsContainer}>
        <h1 className={styles.title}>{title}</h1>
        {comments.map(comment => (
          <Comment comment={comment} postId={postId} key={comment._id} />
        ))}
      </section>
      <CommentForm
        onSubmit={onCommentFormSubmit}
        onChange={onCommentFromChange}
        formData={formData}
      />
    </main>
  );
};

PostPage.propTypes = propTypes;

export default withRouter(PostPage);
