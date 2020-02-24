import React from "react";
import {OffsetElementsX} from "./OffsetElementsX";
import {OffsetElementsY} from "./OffsetElementsY";
import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    BORDER_SPACING_X,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING, BORDER_SPACING_TOP, BORDER_SPACING_BOTTOM
} from "./styling";
import {BorderIndexMaxX} from "./BorderIndexMaxX";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./BorderIndexMaxTop";
import {BorderIndexTop} from "./BorderIndexTop";
import {BorderIndexMaxPreviousBottom} from "./BorderIndexMaxBottom";

type Props = OffsetElementsX & BorderIndexMaxX &
    OffsetElementsY &
    BorderIndexMaxPreviousTop & BorderIndexMaxTop & BorderIndexTop &
    BorderIndexMaxPreviousBottom;

export const NodeShape: React.FC<Props> = node => {
    return (
        <g key={node.offsetElementsY + "_" + node.offsetElementsX}>
            <rect x={node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
            node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X}
                  y={node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                  + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop - node.borderIndexTop) * BORDER_SPACING_TOP
                  + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM}
                  width={ELEMENT_WIDTH}
                  height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
        </g>
    );
};