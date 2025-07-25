import { PresenterInputProps } from '@/types/PresenterInput';
import { useState } from 'react';

const PresenterInput = ({
  presenters,
  onAddPresenter,
  onRemovePresenters,
  speed,
  onSpeedChange,
}: PresenterInputProps & {
  speed: number;
  onSpeedChange: (v: number) => void;
}) => {
  const [presenter, setPresenter] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (presenter) {
      onAddPresenter(presenter);
      setPresenter('');
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelected(values);
  };

  const handleRemove = () => {
    if (selected.length > 0) {
      onRemovePresenters(selected);
      setSelected([]);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 max-w-md mx-auto"
        onSubmit={handleAdd}
      >
        <label htmlFor="presenter" className="block text-sm font-medium mb-2">
          Presenter
        </label>
        <input
          type="text"
          id="presenter"
          className="block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="発表者を入力"
          value={presenter}
          onChange={e => setPresenter(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          追加
        </button>
        <select
          multiple
          id="presenter-list"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          value={selected}
          onChange={handleSelect}
        >
          {presenters.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="bg-red-600 text-white rounded px-4 py-2 mt-2"
          onClick={handleRemove}
          disabled={selected.length === 0}
        >
          選択した発表者を削除
        </button>
      </form>
      <div className="mt-4">
        <label
          htmlFor="speed-slider"
          className="block text-sm font-medium mb-2"
        >
          ルーレットスピード: {speed.toFixed(2)}
        </label>
        <input
          id="speed-slider"
          type="range"
          min={0.05}
          max={1}
          step={0.01}
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PresenterInput;
