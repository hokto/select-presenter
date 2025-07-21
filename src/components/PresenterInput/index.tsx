import { PresenterInputProps } from '@/types/PresenterInput';
import { useState } from 'react';

const PresenterInput = ({ presenters, callback }: PresenterInputProps) => {
  const [presenter, setPresenter] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(presenter);
  };
  return (
    <div>
      <form
        className="flex flex-col gap-4 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          追加
        </button>

        <label htmlFor="presenter" className="block text-sm font-medium mb-2">
          Presenter
        </label>
        <select
          multiple={true}
          id="presenter"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {presenters.map((presenter, i) => (
            <option key={i} value={presenter}>
              {presenter}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default PresenterInput;
