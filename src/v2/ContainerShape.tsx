import React from "react";
import {
    BORDER_SPACING_X,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {OffsetXElements} from "./addOffsetXElements";
import {OffsetYElements} from "./addOffsetYElements";
import {Container} from "./newGraphModel";
import {EmbeddedElementsX} from "./EmbeddedElementsX";
import {EmbeddedBordersX} from "./EmbeddedBordersX";
import {MaxXBorderIndex} from "./addMaxXBorderIndex";
import {LeftBorderIndex} from "./addLeftBorderIndex";

type Props = Container<OffsetXElements & LeftBorderIndex & OffsetYElements & EmbeddedElementsX & MaxXBorderIndex & EmbeddedBordersX>;

export const ContainerShape: React.FC<Props> = container => {
    return (
        <g key={"G_" + container.offsetYElements + "_" + container.offsetXElements}>
            <rect
                x={container.offsetXElements * (ELEMENT_WIDTH + HORIZONTAL_SPACING) +
                (container.maxXBorderIndex * (container.offsetXElements * 2 + 1)  - container.leftBorderIndex) * BORDER_SPACING_X}
                y={container.offsetYElements * (ELEMENT_HEIGHT + VERTICAL_SPACING) + 5}
                width={container.embeddedElementsX * ELEMENT_WIDTH + (container.embeddedElementsX - 1) * HORIZONTAL_SPACING +
                ((container.embeddedElementsX - 1) * container.maxXBorderIndex + container.embeddedBordersX) * 2 * BORDER_SPACING_X}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text x={50} y={50} fill="black">{container.maxXBorderIndex}
            </text>
        </g>
    );
};