export type SectionType = "single" | "double" | "triple" | "inner" | "outer";
export type SectorConfig = {
  type: SectionType;
  innerRadius: number;
  outerRadius: number;
};

export type Operator = "+" | "-" | "*" | "/";

export type FeedbackStatus = "" | "success" | "fail";

export interface ProgressPayload {
  sequenceIndex: number;
  stepIndex: number;
  totalSteps: number;
}

export interface Segment {
  value: number;
  operator: Operator;
}

export interface Step {
  segments: Segment[];
}

export interface Sequence {
  steps: Step[];
}

export interface DartGameProps {
  sequences: Sequence[];
  onSuccess?: () => void;
  onProgressUpdate?: (p: ProgressPayload) => void;
  onFeedbackChange?: (s: FeedbackStatus) => void;
  onFirstOuterClick?: () => void;
  resetSignal?: number;
}

export interface DartboardProps {
  onOuterClick: (value: number) => void;
  activeStep: Step;
  feedback?: FeedbackStatus;
}

export interface DartSectorProps {
  config: SectorConfig;
  numberValue: number;
  startAngle: number;
  endAngle: number;
  colorIndex: number;
  highlight?: { color: string };
  onOuterClick?: (value: number) => void;
}

export interface FeedbackCardProps {
  feedback: FeedbackStatus;
  countdown: number | null;
}

export interface IFeedbackContent {
  success: {
    title: string;
    message: string;
  };
  fail: {
    title: string;
    message: string;
  };
}
