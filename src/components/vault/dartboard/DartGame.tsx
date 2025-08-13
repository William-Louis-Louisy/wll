"use client";
import Dartboard from "./Dartboard";
import { cn } from "@/utils/classnames";
import FeedbackCard from "./FeedbackCard";
import React, { useEffect, useState, useRef } from "react";
import { evaluateStep } from "@/utils/evaluateStep";
import { DartGameProps, FeedbackStatus } from "@/types/dartgame.type";
import LabCellWrapper from "@/components/LabCellWrapper";

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
  const [countdown, setCountdown] = useState<number | null>(null);
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
      setCountdown(null);
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
        setCountdown(5);
        onSuccess?.();
      } else {
        setStepIndex((i) => i + 1);
      }
    } else {
      setStepIndex(0);
      setFeedback("fail");
      setCountdown(3);
    }
  };

  useEffect(() => {
    if (countdown === null) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (!prev || prev <= 1) {
          clearInterval(timer);
          setFeedback("");
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    const saved = localStorage.getItem("dart-progress");
    if (saved) {
      setSequenceIndex(Number(saved));
    }
  }, []);

  // Handle clearing localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("dart-progress");
    setSequenceIndex(0);
    setStepIndex(0);
  };

  return (
    <LabCellWrapper bgColor="#FF738A">
      <div
        className={cn(
          "relative flex items-center justify-center w-full h-full",
          feedback && "pointer-events-none"
        )}
      >
        <Dartboard
          onOuterClick={handleAnswer}
          activeStep={currentStep}
          feedback={feedback}
        />
        <FeedbackCard feedback={feedback} countdown={countdown} />
      </div>

      {/* bouton dev local (tu peux le retirer) */}
      <button
        className="absolute top-2 right-2 text-sm font-medium text-gray-700 cursor-pointer"
        onClick={clearLocalStorage}
      >
        Effacer progression
      </button>
    </LabCellWrapper>
  );
}
