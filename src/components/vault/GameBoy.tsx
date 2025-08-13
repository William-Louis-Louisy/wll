import React from "react";
import LabCellWrapper from "../LabCellWrapper";

export default function GameBoy() {
  return (
    <LabCellWrapper bgColor="#FF73FF">
      <div className="gameboy">
        <div className="front-plate">
          <div className="front-plate-head">
            <div className="vertical-stripe"></div>
            <div className="vertical-stripe"></div>
            <div className="vertical-stripe"></div>

            <div className="vertical-gouge vertical-gouge-1"></div>
            <div className="vertical-gouge vertical-gouge-2"></div>

            <div className="on-off">
              <div className="spike spike-left">
                <div></div>
              </div>
              <div className="spike spike-right">
                <div></div>
              </div>
              <span>
                OFF
                <i></i>
                ON
              </span>
            </div>
          </div>

          <div className="gb-screen-container">
            <div className="screen-headline">
              <span>DOT MATRIX WITH STEREO SOUND</span>
            </div>

            <div className="battery-light">
              <span>BATTERY</span>
            </div>

            <div className="screen"></div>
          </div>

          <div className="logo"></div>

          <div id="controller">
            <div className="buttons-a-b">
              <div className="button-b button-key-j" id="controller_b"></div>

              <div className="button-a button-key-k" id="controller_a"></div>
            </div>

            <div className="start button-key-m" id="controller_start">
              <div></div>
            </div>

            <div className="select button-key-n" id="controller_select">
              <div></div>
            </div>

            <div className="cross-container">
              <div className="spike">
                <div></div>
              </div>
              <div className="spike">
                <div></div>
              </div>
              <div className="spike">
                <div></div>
              </div>
              <div className="spike">
                <div></div>
              </div>

              <div className="cross" id="controller_dpad">
                <div className="top-down">
                  <div className="button-top button-key-w" id="controller_up">
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                  </div>
                  <div
                    className="button-bottom button-key-s"
                    id="controller_down"
                  >
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                  </div>
                </div>

                <div className="left-right">
                  <div
                    className="button-left button-key-a"
                    id="controller_left"
                  >
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                  </div>
                  <div
                    className="button-right button-key-d"
                    id="controller_right"
                  >
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                    <div className="button-stripe"></div>
                  </div>
                </div>
                <div className="cross-middle-bumb"></div>
              </div>
            </div>
          </div>

          <div className="speaker">
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
            <div>
              <div className="speaker-inner-shadow"></div>
            </div>
          </div>

          <div className="phones" id="volume-switch">
            <div className="vertical-stripe"></div>
            <div className="vertical-stripe"></div>
            <div className="vertical-stripe"></div>
            <i></i>
            <span>PHONES</span>
          </div>
        </div>

        <div className="power-button">
          <div></div>
        </div>
      </div>
    </LabCellWrapper>
  );
}
