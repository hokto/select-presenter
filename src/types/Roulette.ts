export interface RouletteProps {
  segments: string[];
  angle: number;
  setAngle: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  size?: number;
  onStop?: (angle: number) => void;
}
