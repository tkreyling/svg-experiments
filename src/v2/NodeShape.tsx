import React from "react";
import {OffsetXElements} from "./addOffsetXElements";
import {OffsetYElements} from "./addOffsetYElements";
import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    GROUP_MARGIN_SIDE,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "../styling";
import {OffsetXBorder} from "./addOffsetXBorders";

export const NodeShape: React.FC<OffsetXElements & OffsetXBorder & OffsetYElements> = node => {
    return (
        <g key={node.offsetYElements + "_" + node.offsetXElements}>
            <rect x={node.offsetXElements * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + node.offsetXBorders * GROUP_MARGIN_SIDE}
                  y={node.offsetYElements * (ELEMENT_HEIGHT + VERTICAL_SPACING)}
                  width={ELEMENT_WIDTH}
                  height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
        </g>
    );
};