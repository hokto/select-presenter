export interface PresenterInputProps {
  presenters: string[];
  onAddPresenter: (name: string) => void;
  onRemovePresenters: (names: string[]) => void;
  speed: number;
  onSpeedChange: (v: number) => void;
}
