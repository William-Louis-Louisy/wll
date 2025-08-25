"use client";
import Dartboard from "./Dartboard";
import FeedbackCard from "./FeedbackCard";
import { evaluateStep } from "@/utils/evaluateStep";
import LabCellWrapper from "@/components/LabCellWrapper";
import React, { useEffect, useState, useRef } from "react";
import { DartGameProps, FeedbackStatus } from "@/types/dartgame.type";

export default function DartGame({
  sequences,
  onSuccess,
  onProgressUpdate,
  onFeedbackChange,
  onFirstOuterClick,
  resetSignal = 0,
}: DartGameProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackStatus>("");
  const startedRef = useRef(false);

  const currentSteps = sequences[sequenceIndex].steps;
  const currentStep = currentSteps[stepIndex];
  const totalSequences = sequences.length;
  const totalSteps = currentSteps.length;

  useEffect(() => {
    onProgressUpdate?.({ sequenceIndex, stepIndex, totalSteps });
  }, [sequenceIndex, stepIndex, totalSteps, onProgressUpdate]);

  useEffect(() => {
    onFeedbackChange?.(feedback);
  }, [feedback, onFeedbackChange]);

  useEffect(() => {
    if (resetSignal > 0) {
      localStorage.removeItem("dart-progress");
      setSequenceIndex(0);
      setStepIndex(0);
      setFeedback("");
      startedRef.current = false;
    }
  }, [resetSignal]);

  const handleAnswer = (input: number) => {
    if (!startedRef.current) {
      startedRef.current = true;
      onFirstOuterClick?.();
    }

    const expected = evaluateStep(currentStep);
    if (input === expected) {
      if (stepIndex + 1 === totalSteps) {
        const nextIndex = (sequenceIndex + 1) % totalSequences;
        setSequenceIndex(nextIndex);
        setStepIndex(0);
        localStorage.setItem("dart-progress", String(nextIndex));
        setFeedback("success");
        onSuccess?.();
      } else {
        setStepIndex((i) => i + 1);
      }
    } else {
      setStepIndex(0);
      setFeedback("fail");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("dart-progress");
    if (saved) {
      setSequenceIndex(Number(saved));
    }
  }, []);

  const handleFeedbackAction = () => {
    setFeedback("");
  };

  return (
    <LabCellWrapper bgColor="#FF738A">
      <div
        className={"relative flex items-center justify-center w-full h-full"}
      >
        <Dartboard
          onOuterClick={handleAnswer}
          activeStep={currentStep}
          feedback={feedback}
        />
        <FeedbackCard feedback={feedback} onAction={handleFeedbackAction} />
      </div>
    </LabCellWrapper>
  );
}
