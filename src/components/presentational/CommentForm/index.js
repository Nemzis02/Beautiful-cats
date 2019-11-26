import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommentForm.module.scss';

const propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  formData: PropTypes.shape({
    comment: PropTypes.string,
    userName: PropTypes.string
  })
};

const CommentForm = ({ onChange, onSubmit, formData }) => {
  return (
    <section className={styles.container}>
      <form className={styles.formContainer}>
        <textarea
          placeholder='Комментарий'
          rows={6}
          name='comment'
          value={formData.comment || ''}
          onChange={onChange}
        ></textarea>
        <input
          type='text'
          placeholder='Псевдоним'
          name='userName'
          value={formData.userName || ''}
          onChange={onChange}
        />
        <button type='button' onClick={onSubmit}>
          Отправить
        </button>
      </form>
    </section>
  );
};

CommentForm.propTypes = propTypes;

export default CommentForm;
