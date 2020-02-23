import React from "react";
import {OffsetXElements} from "./addOffsetXElements";
import {OffsetYElements} from "./addOffsetYElements";
import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    BORDER_SPACING_X,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {BorderIndexMaxX} from "./BorderIndexMaxX";

export const NodeShape: React.FC<OffsetXElements & BorderIndexMaxX & OffsetYElements> = node => {
    return (
        <g key={node.offsetYElements + "_" + node.offsetXElements}>
            <rect x={node.offsetXElements * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
            node.borderIndexMaxX * (node.offsetXElements * 2 + 1) * BORDER_SPACING_X}
                  y={node.offsetYElements * (ELEMENT_HEIGHT + VERTICAL_SPACING)}
                  width={ELEMENT_WIDTH}
                  height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
        </g>
    );
};