import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {OffsetElementsX} from "./OffsetElementsX";
import {OffsetElementsY} from "./OffsetElementsY";
import {Container} from "./newGraphModel";
import {EmbeddedElementsX} from "./EmbeddedElementsX";
import {BorderIndexMaxX} from "./BorderIndexMaxX";
import {BorderIndexLeft} from "./BorderIndexLeft";
import {BorderIndexTop} from "./BorderIndexTop";
import {BorderIndexMaxBottom, BorderIndexMaxPreviousBottom} from "./BorderIndexMaxBottom";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./BorderIndexMaxTop";
import {BorderIndexBottom} from "./BorderIndexBottom";
import {BorderIndexRight} from "./BorderIndexRight";

type Props = Container<
    OffsetElementsX &
    OffsetElementsY &
    EmbeddedElementsX &
    BorderIndexLeft & BorderIndexRight & BorderIndexMaxX &
    BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop &
    BorderIndexBottom & BorderIndexMaxBottom & BorderIndexMaxPreviousBottom>;

export const ContainerShape: React.FC<Props> = container => {
    return (
        <g key={"G_" + container.offsetElementsY + "_" + container.offsetElementsX}>
            <rect
                x={container.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
                (container.borderIndexMaxX * (container.offsetElementsX * 2 + 1)  - container.borderIndexLeft) * BORDER_SPACING_X}
                y={container.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + (container.borderIndexMaxPreviousTop + container.borderIndexMaxTop - container.borderIndexTop) * BORDER_SPACING_TOP
                + container.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM}
                width={container.embeddedElementsX * ELEMENT_WIDTH + (container.embeddedElementsX - 1) * HORIZONTAL_SPACING +
                ((container.embeddedElementsX - 1) * container.borderIndexMaxX * 2 + container.borderIndexLeft + container.borderIndexRight) * BORDER_SPACING_X}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text
                x={container.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
                (container.borderIndexMaxX * (container.offsetElementsX * 2 + 1) - container.borderIndexLeft) * BORDER_SPACING_X}
                y={container.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + (container.borderIndexMaxPreviousTop + container.borderIndexMaxTop - container.borderIndexTop) * BORDER_SPACING_TOP
                + container.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
                + 15}
                fill="black">{
                container.borderIndexMaxPreviousTop + "/" + container.borderIndexTop + "/" + container.borderIndexMaxTop + "__" +
                container.borderIndexMaxPreviousBottom + "/" + container.borderIndexBottom + "/" + container.borderIndexMaxBottom}
            </text>
        </g>
    );
};