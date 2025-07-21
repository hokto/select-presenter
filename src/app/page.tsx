'use client';
import React from 'react';
import { Roulette } from '../components/Roulette';
import StartButton from '@/components/StartButton';
import PresenterInput from '@/components/PresenterInput';
import { useState } from 'react';
export default function Home() {
  const [presenters, setPresenters] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddPresenter = (presenter: string) => {
    setPresenters([...presenters, presenter]);
  };
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">発表者抽選アプリ</h1>
      <PresenterInput presenters={presenters} callback={handleAddPresenter} />
      <StartButton isRunning={isRunning} handleStartStop={handleStartStop} />
      <Roulette segments={presenters} size={350} />
    </main>
  );
}
