import React from 'react';
import PropTypes from 'prop-types';
import { pathOr, take } from 'ramda';
import { Link } from 'react-router-dom';

import { HOST } from 'global/constants';
import { ROUTES } from 'global/routes';

import styles from './Post.module.scss';

const propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string
  }),
  author: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  isAllArticleDisplay: PropTypes.bool,
  isReadButtonDisplay: PropTypes.bool,
  _id: PropTypes.string
};

const Post = props => {
  let article = '';

  if (props.isAllArticleDisplay || props.article.length < 400) {
    article = props.article;
  } else {
    article = `${pathOr('', ['article'], props).slice(0, 400)}...`;
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}${ROUTES.POST}/${props._id}`
    );
  };

  const images = props.isAllArticleDisplay
    ? props.images
    : take(1, props.images);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={props.user.avatar}
          alt={props.author}
        />
        <span className={styles.userName}>{props.author}</span>
        <span className={styles.date}>{props.createdAt}</span>
      </div>
      <h1 className={styles.title}>{props.title}</h1>
      <article className={styles.article}>{article}</article>
      {images.map(image => (
        <img
          key={image}
          className={styles.articleImage}
          src={`${HOST}/${image}`}
          alt={props.title}
        />
      ))}
      <nav className={styles.postFooter}>
        {props.isReadButtonDisplay && (
          <Link to={`${ROUTES.POST}/${props._id}`}>
            <button type='button'>Читать</button>
          </Link>
        )}
        <button type='button' onClick={copyLinkToClipboard}>
          Ссылка
        </button>
        <button type='button'>-</button>0<button type='button'>+</button>0
      </nav>
    </section>
  );
};

Post.propTypes = propTypes;

export default Post;
