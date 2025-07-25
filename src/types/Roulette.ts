export interface RouletteProps {
  segments: string[];
  angle: number;
  setAngle: (angle: number) => void;
  isRunning: boolean;
  onStop?: (finalAngle: number) => void;
  speed: number;
}
