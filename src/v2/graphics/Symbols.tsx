import React from "react";
import {STROKE_WIDTH} from "../styling";
import {Symbols} from "../newGraphModel";
import {assertNever} from "../assertNever";

export type Symbol = {
    symbol: Symbols
    x: number
    y: number
    width: number
    symbolKey: string
}

export const ComponentSymbol: React.FC<Symbol> = ({symbol, symbolKey, width, x, y}) => {
    let height = width * 1.2;
    switch (symbol) {
        case "component": {
            const symbolHeightRelative = 1.1;
            const barWidthRelative = 0.4;
            const barHeightRelative = 0.15;
            const barWidthAbsolute = width * barWidthRelative;
            const barHeightAbsolute = width * barHeightRelative;
            return (
                <g key={symbolKey}>
                    <path d={
                        "M " + (x + barWidthAbsolute / 2) + " " + (y + 4 * barHeightAbsolute) + " " +
                        "h " + (-barWidthAbsolute / 2) + " " +
                        "v " + (-barHeightAbsolute) + " " +
                        "h " + (barWidthAbsolute / 2) + " " +
                        "v " + (-barHeightAbsolute) + " " +
                        "h " + (-barWidthAbsolute / 2) + " " +
                        "v " + (-barHeightAbsolute) + " " +
                        "h " + (barWidthAbsolute / 2) + " " +
                        "v " + (-barHeightAbsolute) + " " +
                        "h " + (width * (1 - barWidthRelative / 2)) + " " +
                        "v " + (width * symbolHeightRelative) + " " +
                        "h " + (-width * (1 - barWidthRelative / 2)) + " " +
                        "Z"
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="none"
                    />
                    <path d={
                        "M " + (x + barWidthAbsolute / 2) + " " + (y + 4 * barHeightAbsolute) + " " +
                        "h " + (barWidthAbsolute / 2) + " " +
                        "v " + (-barHeightAbsolute) + " " +
                        "h " + (-barWidthAbsolute / 2)
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="none"
                    />
                    <path d={
                        "M " + (x + barWidthAbsolute / 2) + " " + (y + 2 * barHeightAbsolute) + " " +
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
        }
        case "db-table": {
            return (
                <g key={symbolKey}>
                    <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill="none"
                        strokeWidth={STROKE_WIDTH}
                        stroke="black"
                    />
                    <path d={
                        "M " + (x) + " " + (y + 0.25 * width) + " " +
                        "h " + width
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="none"
                    />
                    <path d={
                        "M " + (x + 0.25 * width) + " " + (y) + " " +
                        "v " + height
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="none"
                    />
                </g>
            )
        }
        case "s3-bucket": {
            let bucketEllipseY = height * 0.1;
            let bucketIndentX = width * 0.1;
            return (
                <g key={symbolKey}>
                    <path d={
                        "M " + x + " " + (y + bucketEllipseY) + " " +
                        "A " + (width / 2) + "," + bucketEllipseY + " 0 1,1 " + (x + width) + "," + (y + bucketEllipseY) + " " +
                        "L " + (x + width - bucketIndentX) + " " + (y + height - bucketEllipseY) + " " +
                        "A " + (width / 2 - bucketIndentX) + "," + bucketEllipseY + " 0 1,1 " + (x + bucketIndentX) + "," + (y + height - bucketEllipseY) + " " +
                        "Z"
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="white"
                    />
                    <path d={
                        "M " + x + " " + (y + bucketEllipseY) + " " +
                        "A " + (width / 2) + "," + bucketEllipseY + " 0 1,0 " + (x + width) + "," + (y + bucketEllipseY)
                    }
                          stroke="black"
                          strokeWidth={STROKE_WIDTH}
                          fill="none"
                    />
                </g>
            )
        }
        default: {
            assertNever(symbol);
        }
    }
};