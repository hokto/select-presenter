import { StartButtonProps } from '@/types/StartButton';
const baseButtonClass =
  'group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-neutral-200 disabled:pointer-events-none disabled:opacity-50';

const StartButton = ({ isRunning, handleStartStop }: StartButtonProps) => {
  // 状態によって色を切り替える
  const colorClass = isRunning
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-green-600 hover:bg-green-700';

  return (
    <button
      type="button"
      aria-label={isRunning ? 'Stop' : 'Start'}
      className={`${baseButtonClass} ${colorClass}`}
      onClick={handleStartStop}
    >
      {isRunning ? <span>Stop</span> : <span>Start</span>}
    </button>
  );
};

export default StartButton;
