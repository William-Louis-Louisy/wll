"use client";
import { cn } from "@/utils/classnames";
import LabCellWrapper from "@/components/LabCellWrapper";
import styles from "@/styles/Cassette.module.css";

export default function Cassette({ isPlaying }: { isPlaying: boolean }) {
  return (
    <LabCellWrapper bgColor="#A2FF73">
      <div className={styles.cassetteWrapper}>
        <div className={styles.cassetteScrews}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.screw} />
          ))}
        </div>
        <div className={styles.cassetteScrewsT}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className={styles.screw} />
          ))}
        </div>

        <div className={styles.cassetteLabel}>
          <span className={styles.labelA}>A</span>

          <span className={styles.stereoLabel}>STEREO</span>

          <div className={styles.arrow}></div>
        </div>

        <div className={styles.cassetteColorBarT} />
        <div className={styles.cassetteColorBarB} />

        <div className={styles.cassetteWindow}>
          <div className={styles.reelContainer}>
            <div
              className={cn(styles.tapeSpoolbar, isPlaying ? styles.spin : "")}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div
              className={cn(styles.tapeSpoolbar, isPlaying ? styles.spin : "")}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className={styles.nrSection}>
            <span className={styles.nrText}>NR</span>
            <span className={styles.nrOption}>
              <div className={styles.checkbox}></div>
              Yes
            </span>
            <span className={styles.nrOption}>
              <div className={styles.checkbox}></div>
              No
            </span>
          </div>
          <div className={styles.durationSection}>
            <span className={styles.durationMain}>90</span>
            <span className={styles.durationSub}>2 X 45 MIN</span>
            <span className={styles.durationSub}>LOW NOISE</span>
          </div>
        </div>

        <div className={styles.cassetteFooterBg}></div>
        <div className={styles.cassetteFooter}></div>
      </div>
    </LabCellWrapper>
  );
}
