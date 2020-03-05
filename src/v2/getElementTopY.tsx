import {OffsetElementsY} from "./elementsLayout/OffsetElementsY";
import {BorderIndexMaxPreviousTop, BorderIndexMaxTop} from "./elementsLayout/BorderIndexMaxTop";
import {BorderIndexMaxPreviousBottom} from "./elementsLayout/BorderIndexMaxBottom";
import {MidPathSegmentOffsetMaxPreviousY} from "./edgesLayout/MidPathSegmentOffsetYAggregates";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    MARGIN_Y,
    VERTICAL_SPACING
} from "./styling";
import {BorderIndexTop} from "./elementsLayout/BorderIndexTop";

export type RequiredNodeDataGetElementTopY =
    OffsetElementsY &
    BorderIndexTop & BorderIndexMaxTop & BorderIndexMaxPreviousTop &
    BorderIndexMaxPreviousBottom &
    MidPathSegmentOffsetMaxPreviousY

export function getElementTopY(element: RequiredNodeDataGetElementTopY) {
    return MARGIN_Y
        + element.offsetElementsY * (ELEMENT_HEIGHT + VERTICAL_SPACING)
        + (element.borderIndexMaxPreviousTop + element.borderIndexMaxTop - element.borderIndexTop) * BORDER_SPACING_TOP
        + element.borderIndexMaxPreviousBottom * BORDER_SPACING_BOTTOM
        + element.midPathSegmentOffsetMaxPreviousY * EDGE_SPACING;
}