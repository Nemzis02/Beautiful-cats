import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { CommentItem, ReplyForm } from 'components/presentational';
import { ADD_REPLY } from 'apollo/mutations';
import { POST } from 'apollo/queries';

import styles from './Comment.module.scss';

const propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      avatar: PropTypes.string
    }),
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        text: PropTypes.string,
        repliedTo: PropTypes.string,
        createdAt: PropTypes.string,
        user: PropTypes.shape({
          avatar: PropTypes.string
        }),
        _id: PropTypes.string
      })
    )
  })
};

const Comments = ({ comment, postId }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [addComment] = useMutation(ADD_REPLY, {
    onCompleted: () => {
      setFormData({});
      formRef.current.reset();
    },
    update: (store, { data: { addComment } }) => {
      const data = store.readQuery({ query: POST, variables: { id: postId } });
      const parentCommentIndex = data.post.comments.findIndex(
        comment => comment._id === addComment.parentComment
      );
      data.post.comments[parentCommentIndex].replies = [
        ...data.post.comments[parentCommentIndex].replies,
        addComment
      ];
      store.writeQuery({ query: POST, data, variables: { id: postId } });
    }
  });

  const onReply = author => {
    setFormData(prevState => ({
      ...prevState,
      repliedTo: author
    }));
  };

  const onResetReplyName = () => {
    setFormData(prevState => {
      delete prevState.repliedTo;
      const updatedState = { ...prevState };
      return updatedState;
    });
  };

  const onFormChange = event => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData(prevState => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const onReplySend = parentCommentId => {
    addComment({
      variables: {
        parentComment: parentCommentId,
        text: formData.comment,
        author: formData.userName,
        post: postId,
        repliedTo: formData.repliedTo
      }
    });
  };

  return (
    <Fragment>
      <CommentItem comment={comment} onReply={onReply} />
      {comment.replies.map((reply, i, arr) => (
        <div className={styles.replyContainer} key={reply._id}>
          <CommentItem comment={reply} onReply={onReply} />
        </div>
      ))}
      <div className={styles.formContainer}>
        <ReplyForm
          onChange={onFormChange}
          onReplySend={onReplySend}
          commentId={comment._id}
          onResetReplyName={onResetReplyName}
          formData={formData}
          ref={formRef}
        />
      </div>
    </Fragment>
  );
};

Comments.propTypes = propTypes;

export default Comments;
