import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    MARGIN_Y,
    STROKE_WIDTH,
    VERTICAL_SPACING
} from "./styling";
import {OffsetElementsX} from "./elementsLayout/OffsetElementsX";
import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {Container} from "./newGraphModel";
import {EmbeddedElementsX} from "./elementsLayout/EmbeddedElementsX";
import {BorderIndexMaxX} from "./elementsLayout/BorderIndexMaxX";
import {BorderIndexLeft} from "./elementsLayout/BorderIndexLeft";
import {BorderIndexTop} from "./elementsLayout/BorderIndexTop";
import {
    BorderIndexMaxBottom,
    BorderIndexMaxPreviousBottom,
    EmbeddedBorderIndexMaxBottom
} from "./elementsLayout/BorderIndexMaxBottom";
import {
    BorderIndexMaxPreviousTop,
    BorderIndexMaxTop,
    EmbeddedBorderIndexMaxTop
} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexBottom} from "./elementsLayout/BorderIndexBottom";
import {BorderIndexRight} from "./elementsLayout/BorderIndexRight";
import {EmbeddedElementsY} from "./elementsLayout/EmbeddedElementsY";
import {ElementKey} from "./elementsLayout/ElementKey";
import {EmbeddedMidPathSegmentY, MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {CrossLayerPathSegmentOffsetMaxX} from "./edgesLayout/CrossLayerPathSegmentOffsetMaxX";
import {getElementLeftX} from "./getElementLeftX";

type Props = Container<
    ElementKey &
    OffsetElementsX & EmbeddedElementsX &
    OffsetElementsY & EmbeddedElementsY &
    CrossLayerPathSegmentOffsetMaxX &
    BorderIndexLeft & BorderIndexRight & BorderIndexMaxX &
    BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop & EmbeddedBorderIndexMaxTop &
    BorderIndexBottom & BorderIndexMaxBottom & BorderIndexMaxPreviousBottom & EmbeddedBorderIndexMaxBottom &
    MidPathSegmentOffsetMaxPreviousY & EmbeddedMidPathSegmentY>;

export const ContainerShape: React.FC<Props> = container => {
    return (
        <g key={container.elementKey}>
            <rect
                x={getElementLeftX(container)}
                y={MARGIN_Y
                + container.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
                + (container.borderIndexMaxPreviousTop + container.borderIndexMaxTop - container.borderIndexTop) * BORDER_SPACING_TOP
                + container.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
                + container.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING
                }
                width={container.embeddedElementsX * ELEMENT_WIDTH + (container.embeddedElementsX - 1) * HORIZONTAL_SPACING
                + ((container.embeddedElementsX - 1) * container.borderIndexMaxX * 2 + container.borderIndexLeft + container.borderIndexRight) * BORDER_SPACING_X
                + (container.embeddedElementsX - 1) * container.crossLayerPathSegmentOffsetMaxX * EDGE_SPACING
                }
                height={container.embeddedElementsY * ELEMENT_HEIGHT +
                (container.embeddedElementsY - 1) * VERTICAL_SPACING +
                container.borderIndexTop * BORDER_SPACING_TOP +
                container.embeddedBorderIndexMaxTop * BORDER_SPACING_TOP +
                container.embeddedBorderIndexMaxBottom * BORDER_SPACING_BOTTOM +
                container.embeddedMidPathSegmentY * EDGE_SPACING +
                container.borderIndexBottom * BORDER_SPACING_BOTTOM
                }
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>
        </g>
    );
};