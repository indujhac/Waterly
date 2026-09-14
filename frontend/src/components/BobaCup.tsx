import React from "react";
import { useWindowDimensions } from "react-native";
import Svg, {
    Circle,
    ClipPath,
    Defs,
    Ellipse,
    G,
    Path,
    Rect,
} from "react-native-svg";
import { useTheme } from "../context/ThemeContext";

type BobaCupProps = {
  progress: number;
  goalReached: boolean;
};

export default function BobaCup({ progress, goalReached }: BobaCupProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { colors } = useTheme();

  const cupWidth = Math.min(screenWidth * 0.88, 390);
  const cupHeight = Math.min(screenHeight * 0.58, 560);

  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  const liquidBottom = 370;
  const liquidHeight = 260;
  const liquidTop = liquidBottom - liquidHeight * clampedProgress;

  const cupTopLeft = 52;
  const cupTopRight = 248;
  const cupBottomLeft = 88;
  const cupBottomRight = 212;
  const cupTopY = 110;
  const cupBottomY = 370;

  const ratio = (liquidTop - cupTopY) / (cupBottomY - cupTopY);
  const safeRatio = Math.min(Math.max(ratio, 0), 1);

  const surfaceLeft = cupTopLeft + (cupBottomLeft - cupTopLeft) * safeRatio;
  const surfaceRight = cupTopRight + (cupBottomRight - cupTopRight) * safeRatio;
  const surfaceCenter = (surfaceLeft + surfaceRight) / 2;

  const liquidPath = `
    M ${surfaceLeft} ${liquidTop}
    Q ${surfaceCenter} ${liquidTop + 7}
      ${surfaceRight} ${liquidTop}
    L ${cupBottomRight} ${liquidBottom}
    Q 150 ${liquidBottom + 5}
      ${cupBottomLeft} ${liquidBottom}
    Z
  `;

  return (
    <Svg width={cupWidth} height={cupHeight} viewBox="0 0 300 430">
      <Defs>
        <ClipPath id="cupClip">
          <Path
            d="
              M 52 110
              L 248 110
              L 215 350
              Q 212 365 195 370
              Q 150 382 105 370
              Q 88 365 85 350
              Z
            "
          />
        </ClipPath>
      </Defs>

      {/* STRAW */}
      <Rect
        x="137"
        y="10"
        width="26"
        height="75"
        rx="13"
        fill={colors.cup.lid}
      />
      <Ellipse cx="150" cy="12" rx="13" ry="5" fill={colors.cup.lidHighlight} />

      {/* LID */}
      <Rect
        x="35"
        y="75"
        width="230"
        height="42"
        rx="18"
        fill={colors.cup.lid}
      />
      <Rect
        x="35"
        y="75"
        width="230"
        height="15"
        rx="18"
        fill={colors.cup.lidHighlight}
      />
      <Path
        d="M 55 82 Q 150 73 245 82"
        stroke={colors.cup.lidOutline}
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />

      {/* CUP BODY */}
      <Path
        d="
          M 52 110
          L 248 110
          L 215 350
          Q 212 365 195 370
          Q 150 382 105 370
          Q 88 365 85 350
          Z
        "
        fill={colors.cup.body}
      />

      <Path
        d="
          M 55 115
          L 245 115
          L 213 348
          Q 210 362 194 367
          Q 150 377 106 367
          Q 90 362 87 348
          Z
        "
        fill={colors.cup.glassTint}
        opacity="0.55"
      />

      {/* LIQUID */}
      {clampedProgress > 0 && (
        <G clipPath="url(#cupClip)">
          <Path d={liquidPath} fill={colors.cup.liquid} />

          <Rect
            x="70"
            y={liquidTop}
            width="160"
            height="300"
            fill={colors.cup.liquid}
            opacity="0.25"
          />

          <Path
            d={`
              M ${surfaceLeft + 7} ${liquidTop + 1}
              Q ${surfaceCenter} ${liquidTop + 8}
                ${surfaceRight - 7}
                ${liquidTop + 1}
            `}
            stroke={colors.cup.liquidSurface}
            strokeWidth="3"
            fill="none"
          />
        </G>
      )}

      {/* BOBA */}
      <G>
        <Circle cx="112" cy="318" r="10" fill={colors.cup.boba} />
        <Circle cx="139" cy="329" r="11" fill={colors.cup.boba} />
        <Circle cx="168" cy="318" r="10" fill={colors.cup.boba} />
        <Circle cx="193" cy="330" r="10" fill={colors.cup.boba} />
        <Circle cx="126" cy="300" r="10" fill={colors.cup.boba} />
        <Circle cx="153" cy="302" r="11" fill={colors.cup.boba} />
        <Circle cx="180" cy="298" r="10" fill={colors.cup.boba} />
        <Circle cx="101" cy="340" r="9" fill={colors.cup.boba} />
        <Circle cx="181" cy="345" r="9" fill={colors.cup.boba} />
        <Circle cx="205" cy="314" r="9" fill={colors.cup.boba} />

        <Circle
          cx="129"
          cy="297"
          r="2.8"
          fill={colors.cup.bobaHighlight}
          opacity="0.8"
        />
        <Circle
          cx="156"
          cy="299"
          r="2.8"
          fill={colors.cup.bobaHighlight}
          opacity="0.8"
        />
        <Circle
          cx="183"
          cy="295"
          r="2.8"
          fill={colors.cup.bobaHighlight}
          opacity="0.8"
        />
        <Circle
          cx="115"
          cy="315"
          r="2.5"
          fill={colors.cup.bobaHighlight}
          opacity="0.75"
        />
        <Circle
          cx="196"
          cy="327"
          r="2.5"
          fill={colors.cup.bobaHighlight}
          opacity="0.75"
        />
      </G>

      {/* GLASS OUTLINE */}
      <Path
        d="
          M 52 110
          L 248 110
          L 215 350
          Q 212 365 195 370
          Q 150 382 105 370
          Q 88 365 85 350
          Z
        "
        fill="none"
        stroke={colors.cup.outline}
        strokeWidth="3"
      />

      <Path
        d="M 62 125 L 88 338"
        stroke={colors.white}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />

      <Path
        d="M 105 365 Q 150 378 195 365"
        stroke={colors.cup.highlight}
        strokeWidth="3"
        fill="none"
      />
    </Svg>
  );
}
