import React from "react";
import { cn } from "@/utils/classnames";
import styles from "../../../styles/TelevisionSet.module.css";

export default function VolumeIndicator({
  volume,
  visible,
}: {
  volume: number;
  visible: boolean;
}) {
  const activeBarCount = Math.ceil(volume * 10);

  return (
    <div
      className={cn(
        styles["volume-indicator"],
        visible ? styles["visible"] : styles["hidden"]
      )}
    >
      <div className={styles["volume-bars"]}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              styles["volume-bar"],
              index < activeBarCount && styles["volume-bar--active"]
            )}
          />
        ))}
        <span className={styles["volume-percent"]}>
          {(volume * 100).toFixed(0)}
        </span>
      </div>
    </div>
  );
}
