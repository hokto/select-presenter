'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RouletteProps } from '@/types/Roulette';

const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#E7E9ED',
  '#8BC34A',
  '#F44336',
  '#00BCD4',
  '#FFC107',
  '#9C27B0',
  '#3F51B5',
  '#CDDC39',
];

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  // 中心点(M)から円周の開始点まで移動(L),指定の場所まで円弧を描き(A),閉じる(Z)
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
};

export const Roulette: React.FC<RouletteProps> = ({ segments, size = 300 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const anglePerSegment = 360 / segments.length;

  // SSR対策: angleの初期値をランダムにし、マウント後にだけ描画
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState(() => Math.random() * 360);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      // 無限に加算されないように，720を閾値にして，360(一周分だけ)だけ戻す
      setAngle(prev => {
        const next = prev + delta * 0.2;
        return next > 720 ? next - 360 : next;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mounted]);

  // マウント前は何も描画しない
  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: `rotate(${angle}deg)`,
          display: 'block',
          margin: '0 auto',
          pointerEvents: 'none', // ボタンクリックできるように
        }}
      >
        {segments.map((label, i) => {
          const startAngle = i * anglePerSegment;
          const endAngle = (i + 1) * anglePerSegment;
          const path = describeArc(cx, cy, r, startAngle, endAngle);
          const color = COLORS[i % COLORS.length];
          // ラベルの位置
          const midAngle = startAngle + anglePerSegment / 2;
          const labelPos = polarToCartesian(cx, cy, r * 0.65, midAngle);
          return (
            <g key={i}>
              <path d={path} fill={color} stroke="#fff" strokeWidth={2} />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={16}
                fill="#222"
                style={{ userSelect: 'none' }}
              >
                {label}
              </text>
            </g>
          );
        })}
        {/* 中心の円 */}
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.3}
          fill="#fff"
          stroke="#ccc"
          strokeWidth={2}
        />
      </svg>
      <div style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
        angle: {angle.toFixed(2)}
      </div>
    </div>
  );
};
