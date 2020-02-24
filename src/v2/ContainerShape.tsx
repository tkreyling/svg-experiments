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
import {EmbeddedBordersX} from "./EmbeddedBordersX";
import {BorderIndexMaxX} from "./BorderIndexMaxX";
import {BorderIndexLeft} from "./BorderIndexLeft";
import {BorderIndexTop} from "./BorderIndexTop";
import {BorderIndexMaxBottom} from "./BorderIndexMaxBottom";
import {BorderIndexMaxTop} from "./BorderIndexMaxTop";

type Props = Container<
    OffsetElementsX & BorderIndexLeft & BorderIndexMaxX & EmbeddedElementsX & EmbeddedBordersX &
    OffsetElementsY & BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxBottom>;

export const ContainerShape: React.FC<Props> = container => {
    return (
        <g key={"G_" + container.offsetElementsY + "_" + container.offsetElementsX}>
            <rect
                x={container.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
                (container.borderIndexMaxX * (container.offsetElementsX * 2 + 1)  - container.borderIndexLeft) * BORDER_SPACING_X}
                y={container.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + container.borderIndexMaxTop * (container.offsetElementsY + 1) * BORDER_SPACING_TOP
                + container.borderIndexMaxBottom * container.offsetElementsY * BORDER_SPACING_BOTTOM
                - container.borderIndexTop * BORDER_SPACING_TOP}
                width={container.embeddedElementsX * ELEMENT_WIDTH + (container.embeddedElementsX - 1) * HORIZONTAL_SPACING +
                ((container.embeddedElementsX - 1) * container.borderIndexMaxX + container.embeddedBordersX) * 2 * BORDER_SPACING_X}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text
                x={container.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
                (container.borderIndexMaxX * (container.offsetElementsX * 2 + 1)  - container.borderIndexLeft) * BORDER_SPACING_X}
                y={container.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + container.borderIndexMaxTop * (container.offsetElementsY + 1) * BORDER_SPACING_TOP
                + container.borderIndexMaxBottom * container.offsetElementsY * BORDER_SPACING_BOTTOM
                - container.borderIndexTop * BORDER_SPACING_TOP+ 15}
                fill="black">{container.borderIndexTop + "/" + container.borderIndexMaxTop}
            </text>
        </g>
    );
};