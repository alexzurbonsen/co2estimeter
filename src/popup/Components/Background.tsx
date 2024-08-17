// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
export type BackgroundProps = {
  width: number;
  height: number;
  on: boolean;
};

export default function Background({ width, height, on }: BackgroundProps) {
  return (
    <svg
      version="1.1"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className="background"
    >
      <defs>
        <radialGradient
          id="gradient"
          cx="0.6"
          cy="0.2"
          r="2"
          fx="0.15"
          fy="0.1"
        >
          <stop offset="30%" stopColor={on ? '#FFFB1B' : '#E3E3E3'} />
          <stop offset="90%" stopColor={on ? '#19E730' : '#959595'} />
        </radialGradient>
      </defs>

      <rect
        width="100%"
        height="100%"
        rx="14"
        ry="14"
        fill="url('#gradient')"
      />
    </svg>
  );
}
//62FB1B
