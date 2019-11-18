import React from "react";

import { Posts } from 'components/containers';

import styles from "./Feed.module.scss";

const Feed = () => {
  return (
    <main className={styles.container}>
      <Posts />
    </main>
  );
};

export default Feed;
