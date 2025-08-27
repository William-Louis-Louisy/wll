import React from "react";
import LabCellWrapper from "../LabCellWrapper";
import styles from "../../styles/GameBoy.module.css";

export default function GameBoy() {
  return (
    <LabCellWrapper bgColor="#FF73FF">
      <div className={styles.gameboy}>
        <div className={styles.frontPlate}>
          <div className={styles.frontPlateHead}>
            {/* stries décoratives */}
            <div className={styles.verticalStripe} style={{ left: 22 }} />
            <div className={styles.verticalStripe} style={{ left: 26 }} />
            <div className={styles.verticalStripe} style={{ left: 29 }} />

            {/* gouges */}
            <div
              className={`${styles.verticalGouge} ${styles.verticalGouge1}`}
            />
            <div
              className={`${styles.verticalGouge} ${styles.verticalGouge2}`}
            />

            {/* ON / OFF */}
            <div className={styles.onOff}>
              <span className={styles.onOffLabel}>ON&nbsp;/&nbsp;OFF</span>
              <i className={styles.onOffDot} />
              <i className={`${styles.onOffSpike} ${styles.onOffSpikeLeft}`}>
                <div />
              </i>
              <i className={`${styles.onOffSpike} ${styles.onOffSpikeRight}`}>
                <div />
              </i>
            </div>
          </div>

          {/* Screen + LED */}
          <div className={styles.gbScreenContainer}>
            <div className={styles.screenHeadline}>
              <span className={styles.screenHeadlineText}>
                DOT MATRIX WITH STEREO SOUND
              </span>
            </div>

            <i className={styles.batteryLight} />
            <span className={styles.batteryLabel}>BATTERY</span>

            <div className={styles.screen} />
          </div>

          {/* Logo */}
          <div className={styles.logo} />

          {/* Controls */}
          <div id="controller">
            {/* Boutons A/B */}
            <div className={styles.buttonsAB}>
              <div
                className={`${styles.buttonB} button-key-j`}
                id="controller_b"
              />
              <div
                className={`${styles.buttonA} button-key-k`}
                id="controller_a"
              />
            </div>

            {/* Start / Select */}
            <div
              className={`${styles.start} button-key-m`}
              id="controller_start"
            >
              <div className={styles.startInner} />
            </div>
            <div
              className={`${styles.select} button-key-n`}
              id="controller_select"
            >
              <div className={styles.selectInner} />
            </div>

            {/* Croix directionnelle */}
            <div className={styles.crossContainer}>
              <div className={`${styles.dpadSpike} ${styles.dpadSpikeTop}`}>
                <div />
              </div>
              <div className={`${styles.dpadSpike} ${styles.dpadSpikeLeft}`}>
                <div />
              </div>
              <div className={`${styles.dpadSpike} ${styles.dpadSpikeRight}`}>
                <div />
              </div>
              <div className={`${styles.dpadSpike} ${styles.dpadSpikeBottom}`}>
                <div />
              </div>

              <div className={styles.cross} id="controller_dpad">
                <div className={styles.topDown}>
                  <div
                    className={`${styles.buttonTop} button-key-w`}
                    id="controller_up"
                  >
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                  </div>
                  <div
                    className={`${styles.buttonBottom} button-key-s`}
                    id="controller_down"
                  >
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                  </div>
                </div>

                <div className={styles.leftRight}>
                  <div
                    className={`${styles.buttonLeft} button-key-a`}
                    id="controller_left"
                  >
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                  </div>
                  <div
                    className={`${styles.buttonRight} button-key-d`}
                    id="controller_right"
                  >
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                    <div className={styles.buttonStripe} />
                  </div>
                </div>

                <div className={styles.crossMiddleBumb} />
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className={styles.speaker} aria-hidden>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div className={styles.speakerInnerShadow} />
          </div>
        </div>
      </div>
    </LabCellWrapper>
  );
}
