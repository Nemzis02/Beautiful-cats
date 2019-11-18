import React from "react";
import PropTypes from "prop-types";

import styles from "./PreviewPost.module.scss";

const propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.string,
  image: PropTypes.string
};

const PreviewPost = props => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={props.avatar}
          alt={props.userName}
        />
        <span className={styles.userName}>{props.userName}</span>
        <span className={styles.date}>{props.date}</span>
      </div>
      <h1 className={styles.title}>{props.title}</h1>
      <article className={styles.article}>{props.article}</article>
      <img
        className={styles.articleImage}
        src={props.image}
        alt={props.title}
      />
      <nav className={styles.postFooter}>
        <button type="button">Ссылка</button>
        <button type="button">-</button>
        <button type="button">+</button>
      </nav>
    </section>
  );
};

PreviewPost.propTypes = propTypes;

export default PreviewPost;
