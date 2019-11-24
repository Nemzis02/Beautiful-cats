import React from 'react';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';
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
  const article = props.isAllArticleDisplay
    ? props.article
    : `${pathOr('', ['article'], props).slice(0, 400)}...`;
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
      <img
        className={styles.articleImage}
        src={`${HOST}/${props.images[0]}`}
        alt={props.title}
      />
      <nav className={styles.postFooter}>
        {props.isReadButtonDisplay && (
          <Link to={`${ROUTES.POST}/${props._id}`}>
            <button type='button'>Читать</button>
          </Link>
        )}
        <button type='button'>Ссылка</button>
        <button type='button'>-</button>
        0
        <button type='button'>+</button>
        0
      </nav>
    </section>
  );
};

Post.propTypes = propTypes;

export default Post;
