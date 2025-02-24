"use client";

import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={`${styles.square} ${styles.sq1}`} />
      <div className={`${styles.square} ${styles.sq2}`} />
      <div className={`${styles.square} ${styles.sq3}`} />
      <div className={`${styles.square} ${styles.sq4}`} />
      <div className={`${styles.square} ${styles.sq5}`} />
      <div className={`${styles.square} ${styles.sq6}`} />
      <div className={`${styles.square} ${styles.sq7}`} />
      <div className={`${styles.square} ${styles.sq8}`} />
      <div className={`${styles.square} ${styles.sq9}`} />
    </div>
  );
}
