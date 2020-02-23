import React from "react";
import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    GROUP_MARGIN_SIDE,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "../styling";
import {OffsetXElements} from "./addOffsetXElements";
import {OffsetYElements} from "./addOffsetYElements";
import {Container} from "./newGraphModel";
import {EmbeddedXElements} from "./addEmbeddedXElements";
import {EmbeddedXBorders} from "./addEmbeddedXBorders";
import {OffsetXBorder} from "./addOffsetXBorders";

type Props = Container<OffsetXElements & OffsetXBorder & OffsetYElements & EmbeddedXElements & EmbeddedXBorders>;

export const ContainerShape: React.FC<Props> = container => {
    return (
        <g key={"G_" + container.offsetYElements + "_" + container.offsetXElements}>
            <rect
                x={container.offsetXElements * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + container.offsetXBorders * GROUP_MARGIN_SIDE}
                y={container.offsetYElements * (ELEMENT_HEIGHT + VERTICAL_SPACING) + 5}
                width={container.embeddedXElements * ELEMENT_WIDTH + (container.embeddedXElements - 1) * HORIZONTAL_SPACING +
                container.embeddedXBorders * 2 * GROUP_MARGIN_SIDE}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>
        </g>
    );
};