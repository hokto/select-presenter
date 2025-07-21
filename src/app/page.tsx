'use client';
import React from 'react';
import { Roulette } from '../components/Roulette';

const presenters = [
  '田中',
  '佐藤',
  '鈴木',
  '高橋',
  '伊藤',
  '渡辺',
  '山本',
  '中村',
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">発表者抽選アプリ</h1>
      <Roulette segments={presenters} size={350} />
    </main>
  );
}
