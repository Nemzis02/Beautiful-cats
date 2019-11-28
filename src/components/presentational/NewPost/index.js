import React from 'react';
import PropTypes from 'prop-types';

import styles from './NewPost.module.scss';

const propTypes = {
  onChange: PropTypes.func,
  formData: PropTypes.shape({
    title: PropTypes.string,
    article: PropTypes.string,
    city: PropTypes.string,
    author: PropTypes.string,
    localImage: PropTypes.string
  }),
  onSubmit: PropTypes.func
};

const NewPost = props => {
  const { formData } = props;
  return (
    <div className={styles.container}>
      <form className={styles.form} onChange={props.onChange}>
        <input
          type='text'
          name='title'
          placeholder='Заголовок'
          defaultValue={formData.title}
        />
        <textarea
          name='article'
          placeholder='Введите текст'
          rows={6}
          defaultValue={formData.article}
        />
        <input name='image' type='file' accept='.png, .jpg, .jpeg' multiple />
        <select name='city' defaultValue={formData.city}>
          <option value='Ялта'>Ялта</option>
          <option value='Симферополь'>Симферополь</option>
        </select>
        <input
          name='author'
          type='text'
          placeholder='Никнейм'
          defaultValue={formData.author}
        />
        {formData.localImage && <img src={formData.localImage} className={styles.image} alt='Post' />}
        <button type='button' onClick={props.onSubmit}>
          Отправить
        </button>
      </form>
    </div>
  );
};

NewPost.propTypes = propTypes;

export default NewPost;
