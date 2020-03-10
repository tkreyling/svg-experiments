import React from "react";
import {STROKE_WIDTH} from "../styling";

export type Symbol = {
    x: number
    y: number
    width: number
    symbolKey: string
}

export const ComponentSymbol: React.FC<Symbol> = symbol => {
    const symbolHeightRelative = 1.1;
    const barWidthRelative = 0.4;
    const barHeightRelative = 0.15;
    const barWidthAbsolute = symbol.width * barWidthRelative;
    const barHeightAbsolute = symbol.width * barHeightRelative;
    return (
        <g key={symbol.symbolKey}>
            <path d={
                "M " + (symbol.x + barWidthAbsolute / 2) + " " + (symbol.y + 4 * barHeightAbsolute) + " " +
                "h " + (-barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (-barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (symbol.width * (1 - barWidthRelative / 2)) + " " +
                "v " + (symbol.width * symbolHeightRelative) + " " +
                "h " + (-symbol.width * (1 - barWidthRelative / 2)) + " " +
                "Z"
            }
                  stroke="black"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
            />
            <path d={
                "M " + (symbol.x + barWidthAbsolute / 2) + " " + (symbol.y + 4 * barHeightAbsolute) + " " +
                "h " + (barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (-barWidthAbsolute / 2)
            }
                  stroke="black"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
            />
            <path d={
                "M " + (symbol.x + barWidthAbsolute / 2) + " " + (symbol.y + 2 * barHeightAbsolute) + " " +
                "h " + (barWidthAbsolute / 2) + " " +
                "v " + (-barHeightAbsolute) + " " +
                "h " + (-barWidthAbsolute / 2)
            }
                  stroke="black"
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
            />
        </g>
    );
};