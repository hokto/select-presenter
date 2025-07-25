'use client';

import React, { useEffect, useRef } from 'react';
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
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
};

const Roulette: React.FC<RouletteProps & { speed: number }> = ({
  segments,
  angle,
  setAngle,
  isRunning,
  size = 300,
  onStop,
  speed,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const anglePerSegment = 360 / segments.length;
  const rafRef = useRef<number | null>(null);
  const prevIsRunning = useRef(isRunning);

  // アニメーションループ（一定速度、isRunningがfalseになったら即停止）
  useEffect(() => {
    if (!isRunning) return;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      setAngle(angle + delta * speed);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, setAngle, speed, angle]);

  // isRunningがfalseになった瞬間にonStopを呼ぶ
  useEffect(() => {
    if (prevIsRunning.current && !isRunning && onStop) {
      onStop(angle);
    }
    prevIsRunning.current = isRunning;
  }, [isRunning, onStop, angle]);

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
          pointerEvents: 'none',
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
    </div>
  );
};

export default Roulette;
