"use client";

import { customerOverviewChartSeries } from "./overallInformationData";

const SIZE = 123;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 49;
const OUTER_STROKE = 12;
const INNER_RADIUS = 27;
const INNER_STROKE = 10;

const ringDash = (radius: number, percent: number) => {
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;
  return `${filled} ${circumference - filled}`;
};

export default function CustomerOverviewChart() {
  const { firstTimePercent, returnPercent, colors } =
    customerOverviewChartSeries;

  return (
    <div className="overall-information__chart" aria-hidden="true">
      <svg
        className="overall-information__chart-svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke={colors.track}
          strokeWidth={OUTER_STROKE}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          fill="none"
          stroke={colors.firstTime}
          strokeWidth={OUTER_STROKE}
          strokeLinecap="round"
          strokeDasharray={ringDash(OUTER_RADIUS, firstTimePercent)}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="none"
          stroke={colors.track}
          strokeWidth={INNER_STROKE}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="none"
          stroke={colors.returning}
          strokeWidth={INNER_STROKE}
          strokeLinecap="round"
          strokeDasharray={ringDash(INNER_RADIUS, returnPercent)}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>
    </div>
  );
}
