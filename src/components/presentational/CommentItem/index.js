import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommentItem.module.scss';

const propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      avatar: PropTypes.string
    }),
    repliedTo: PropTypes.string
  }),
  onReply: PropTypes.func
};

const CommentItem = ({ comment, onReply }) => {
  const onReplyHandler = () => onReply && onReply(comment.author);
  return (
    <div>
      <nav className={styles.commentHeader}>
        <img src={comment.user.avatar} alt='avatar' className={styles.avatar} />
        <span className={styles.author}>{comment.author}</span>
        <span>{comment.createdAt}</span>
      </nav>
      {comment.repliedTo && (
        <span className={styles.repliedName}>
          ответ для <b>{comment.repliedTo}</b>:
        </span>
      )}
      <p className={styles.commentText}>
        {comment.text}
        <span onClick={onReplyHandler} className={styles.replyButton}>
          Ответить
        </span>
      </p>
    </div>
  );
};

CommentItem.propTypes = propTypes;

export default CommentItem;
