import React from "react";
import styles from "../../../styles/Walkman.module.css";

export default function AutoReverse() {
  return (
    <div className={styles.autoReverse}>
      <span className={styles.leftTriangle}></span>
      <span>Auto Reverse</span>
      <span className={styles.rightTriangle}></span>
    </div>
  );
}
