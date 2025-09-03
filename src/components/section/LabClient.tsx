"use client";

import LabModal from "@/components/LabModal";
import { useChrono } from "@/hooks/useChrono";
import { useAudio } from "@/contexts/AudioContext";
import { useVideo } from "@/contexts/VideoContext";
import React, { useCallback, useState } from "react";
import AkaiMPC from "@/components/vault/mpc/AkaiMPC";
import VCR from "@/components/vault/videorecorder/VCR";
import { defaultSequences } from "@/lib/dartSequences";
import Cassette from "@/components/vault/tape/Cassette";
import Walkman from "@/components/vault/walkman/Walkman";
import GameBoy from "@/components/vault/gameboy/GameBoy";
import DartGame from "@/components/vault/dartboard/DartGame";
import Scoreboard from "@/components/vault/scoreboard/Scoreboard";
import TelevisionSet from "@/components/vault/monitor/TelevisionSet";
import { FeedbackStatus, ProgressPayload } from "@/types/dartgame.type";

export default function LabClient() {
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
    chrono.reset();
    setSeqIdx(0);
    setStepIdx(0);
    setTotalSteps(defaultSequences[0].steps.length);
    setFeedback("");
    setResetSignal((n) => n + 1);
  }, [chrono]);
  return (
    <main className="min-h-page w-full overflow-hidden mt-16 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
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
      <LabModal storageKey="lab:intro:seen:v1" />
    </main>
  );
}
