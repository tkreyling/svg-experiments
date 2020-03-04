import React from "react";
import {OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {ElementKey} from "./elementsLayout/ElementKey";
import {MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {CrossLayerPathSegmentOffsetMaxX} from "./edgesLayout/CrossLayerPathSegmentOffsetMaxX";

type Props = ElementKey &
    OffsetElementsX & BorderIndexMaxX & CrossLayerPathSegmentOffsetMaxX &
    OffsetElementsY &
    BorderIndexMaxPreviousTop & BorderIndexMaxTop &
    BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY;

export const NodeShape: React.FC<Props> = node => {
    return (
        <g key={node.elementKey}>
            <rect
                x={node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING)
                + node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X
                + node.crossLayerPathSegmentOffsetMaxX * node.offsetElementsX * EDGE_SPACING
                }
                y={node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop) * BORDER_SPACING_TOP
                + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
                + node.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING
                }
                width={ELEMENT_WIDTH}
                height={ELEMENT_HEIGHT}
                fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>

            <text
                x={node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING)
                + node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X
                + node.crossLayerPathSegmentOffsetMaxX * node.offsetElementsX * EDGE_SPACING
                }
                y={node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop) * BORDER_SPACING_TOP
                + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
                + node.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING
                + 15
                }
                fill="black">{
                node.midPathSegmentOffsetMaxPreviousY
            }
            </text>
        </g>
    );
};