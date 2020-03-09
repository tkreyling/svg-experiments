import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {BorderIndexMaxX} from "../elementsLayout/BorderIndexMaxX";
import {CrossLayerPathSegmentOffsetMaxX} from "../edgesLayout/CrossLayerPathSegmentOffsetMaxX";
import {BORDER_SPACING_X, EDGE_SPACING, ELEMENT_WIDTH, HORIZONTAL_SPACING, MARGIN_X} from "../styling";
import {BorderIndexLeft} from "../elementsLayout/BorderIndexLeft";

export type RequiredNodeDataGetElementLeftX =
    OffsetElementsX &
    BorderIndexLeft & BorderIndexMaxX &
    CrossLayerPathSegmentOffsetMaxX

export function getElementLeftX(element: RequiredNodeDataGetElementLeftX) {
    return MARGIN_X
        + element.offsetElementsX * (ELEMENT_WIDTH + HORIZONTAL_SPACING)
        + (element.borderIndexMaxX * (element.offsetElementsX * 2 + 1) - element.borderIndexLeft) * BORDER_SPACING_X
        + element.crossLayerPathSegmentOffsetMaxX * element.offsetElementsX * EDGE_SPACING;
}