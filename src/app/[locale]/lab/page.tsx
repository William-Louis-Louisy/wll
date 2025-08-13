"use client";

import React, { useCallback, useState } from "react";
import VCR from "@/components/vault/VCR";
import GameBoy from "@/components/vault/GameBoy";
import { FeedbackStatus, ProgressPayload } from "@/types/dartgame.type";
import { useAudio } from "@/contexts/AudioContext";
import { useVideo } from "@/contexts/VideoContext";
import Cassette from "@/components/vault/Cassette";
import Walkman from "@/components/vault/walkman/Walkman";
import TelevisionSet from "@/components/vault/TelevisionSet";
import DartGame from "@/components/vault/dartboard/DartGame";
import AkaiMPC from "@/components/vault/mpc/AkaiMPC";
import Scoreboard from "@/components/vault/Scoreboard";
import { useChrono } from "@/hooks/useChrono";
import { defaultSequences } from "@/lib/dartSequences";

export default function Lab() {
  const { isVideoPlaying, videoRef, playVideo, pauseVideo, stopVideo } =
    useVideo();
  const [seqIdx, setSeqIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [totalSteps, setTotalSteps] = useState(
    defaultSequences[0].steps.length
  );
  const [feedback, setFeedback] = useState<FeedbackStatus>("");
  const [resetSignal, setResetSignal] = useState(0);

  const totalSequences = defaultSequences.length;
  const chrono = useChrono(100);

  const handleProgressUpdate = useCallback((p: ProgressPayload) => {
    setSeqIdx(p.sequenceIndex);
    setStepIdx(p.stepIndex);
    setTotalSteps(p.totalSteps);
  }, []);

  const handleFeedbackChange = useCallback((s: FeedbackStatus) => {
    setFeedback(s);
  }, []);

  const handleFirstOuterClick = useCallback(() => {
    if (!chrono.started) chrono.start();
  }, [chrono]);

  const handleReset = useCallback(() => {
    // reset côté UI + envoyer un signal de reset à DartGame
    chrono.reset();
    setSeqIdx(0);
    setStepIdx(0);
    setTotalSteps(defaultSequences[0].steps.length);
    setFeedback("");
    setResetSignal((n) => n + 1);
  }, [chrono]);

  return (
    <main>
      <div className="min-h-page w-full overflow-hidden mt-16 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
        <Cassette isPlaying={useAudio().isPlaying} />
        <Walkman />
        <VCR play={playVideo} pause={pauseVideo} stop={stopVideo} />
        <TelevisionSet isVideoDisplayed={isVideoPlaying} videoRef={videoRef} />
        <GameBoy />
        <DartGame
          sequences={defaultSequences}
          onProgressUpdate={handleProgressUpdate}
          onFeedbackChange={handleFeedbackChange}
          onFirstOuterClick={handleFirstOuterClick}
          resetSignal={resetSignal}
        />
        <Scoreboard
          sequenceIndex={seqIdx}
          totalSequences={totalSequences}
          stepIndex={stepIdx}
          totalSteps={totalSteps}
          elapsedMs={chrono.elapsedMs}
          running={chrono.running}
          feedback={feedback}
          onReset={handleReset}
        />
        <AkaiMPC />
      </div>
    </main>
  );
}
