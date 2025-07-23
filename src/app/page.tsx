'use client';
import React, { useEffect, useRef, useState } from 'react';
import PresenterInput from '@/components/PresenterInput';
import Roulette from '@/components/Roulette';
import StartButton from '@/components/StartButton';

export default function Home() {
  const [presenters, setPresenters] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 発表者追加
  const handleAddPresenter = (name: string) => {
    if (name) {
      setPresenters(prev => [...prev, name]);
    }
  };

  // 発表者削除
  const handleRemovePresenters = (names: string[]) => {
    setPresenters(prev => prev.filter(p => !names.includes(p)));
  };

  // スタートボタン押下時の処理
  const handleStart = () => {
    setIsRunning(true);
    setWinner(null);
    // ランダムな停止時間（2〜10秒）
    const stopTime = Math.random() * 8000 + 2000;
    timerRef.current = setTimeout(() => {
      setIsRunning(false);
    }, stopTime);
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 完全停止時にwinnerを判定
  const handleStop = (finalAngle: number) => {
    const segs = presenters.length ? presenters : ['---'];
    const segAngle = 360 / segs.length;
    const normalized = ((finalAngle % 360) + 360) % 360;
    const winnerIdx =
      (segs.length - 1 - Math.floor(normalized / segAngle)) % segs.length; // 逆順なのでsegs.length - 1から引く
    setWinner(segs[winnerIdx]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-4xl font-bold mb-4">発表者抽選アプリ</h1>
      {winner && (
        <div className="text-2xl font-bold text-blue-600 mb-2">
          当選者: {winner}
        </div>
      )}
      <PresenterInput
        presenters={presenters}
        onAddPresenter={handleAddPresenter}
        onRemovePresenters={handleRemovePresenters}
      />
      <Roulette
        segments={presenters.length ? presenters : ['---']}
        angle={angle}
        setAngle={setAngle}
        isRunning={isRunning}
        onStop={handleStop}
      />
      <StartButton isRunning={isRunning} onClick={handleStart} />
    </main>
  );
}
