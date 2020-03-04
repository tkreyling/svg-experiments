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
    SYMBOL_SPACING,
    SYMBOL_WIDTH,
    TEXT_PADDING,
    VERTICAL_SPACING
} from "./styling";
import {BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {ElementKey} from "./elementsLayout/ElementKey";
import {MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {CrossLayerPathSegmentOffsetMaxX} from "./edgesLayout/CrossLayerPathSegmentOffsetMaxX";
import {Node} from "./newGraphModel"

type Props = Node & ElementKey &
    OffsetElementsX & BorderIndexMaxX & CrossLayerPathSegmentOffsetMaxX &
    OffsetElementsY &
    BorderIndexMaxPreviousTop & BorderIndexMaxTop &
    BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY;

export const NodeShape: React.FC<Props> = node => {
    let hasSymbol = false;
    let x = node.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING)
        + node.borderIndexMaxX * (node.offsetElementsX * 2 + 1) * BORDER_SPACING_X
        + node.crossLayerPathSegmentOffsetMaxX * node.offsetElementsX * EDGE_SPACING;
    let y = node.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
        + (node.borderIndexMaxPreviousTop + node.borderIndexMaxTop) * BORDER_SPACING_TOP
        + node.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
        + node.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING;
    return (
        <g key={node.elementKey}>
            <rect
                x={x} y={y}
                width={ELEMENT_WIDTH}
                height={ELEMENT_HEIGHT}
                fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>
            {node.name !== undefined &&
            <g>
                <text
                    x={x + TEXT_PADDING} y={y + ELEMENT_HEIGHT / 2}
                    fill="black"
                    clipPath={"url(#clip-element-text-" + node.elementKey + ")"}>{node.name}
                </text>

                <clipPath id={"clip-element-text-" + node.elementKey}>
                    <rect
                        x={x + TEXT_PADDING} y={y}
                        width={ELEMENT_WIDTH - 2 * TEXT_PADDING - (hasSymbol ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)}
                        height={ELEMENT_HEIGHT}/>
                </clipPath>
            </g>
            }
        </g>
    );
};