/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './ReplyForm.module.scss';

const propTypes = {
  onChange: PropTypes.func,
  onReplySend: PropTypes.func,
  formData: PropTypes.shape({
    repliedTo: PropTypes.string,
    userName: PropTypes.string,
    comment: PropTypes.string
  }),
  commentId: PropTypes.string,
  onResetReplyName: PropTypes.func
};

const defaultProps = {
  formData: {
    repliedTo: '',
    userName: '',
    comment: ''
  }
};

const ReplyForm = React.forwardRef(
  ({ onChange, formData, commentId, onReplySend, onResetReplyName }, ref) => {
    const onReplayHandler = () => onReplySend && onReplySend(commentId);
    return (
      <form className={styles.form} onChange={onChange} ref={ref}>
        {formData.repliedTo && (
          <div className={styles.replyNameContainer}>
            <span>{formData.repliedTo}</span>
            <button type='button' onClick={onResetReplyName}>
              X
            </button>
          </div>
        )}
        <input
          type='text'
          placeholder='Псевдоним'
          name='userName'
          defaultValue={formData.userName}
        />
        <div className={styles.commentContainer}>
          <input
            type='text'
            placeholder='Оставить комментарий'
            name='comment'
            defaultValue={formData.comment}
          />
          <button type='button' onClick={onReplayHandler}>
            Ответить
          </button>
        </div>
      </form>
    );
  }
);

ReplyForm.propTypes = propTypes;
ReplyForm.defaultProps = defaultProps;

export default ReplyForm;
