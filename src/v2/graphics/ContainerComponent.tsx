import React from "react";
import {
    BORDER_SPACING_BOTTOM,
    BORDER_SPACING_TOP,
    BORDER_SPACING_X,
    DEPLOYMENT_BOX_3D_OFFSET,
    DEPLOYMENT_BOX_INDENT,
    EDGE_SPACING,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    HORIZONTAL_SPACING,
    STROKE_WIDTH,
    TEXT_PADDING,
    VERTICAL_SPACING
} from "../styling";
import {Container} from "../newGraphModel";
import {EmbeddedElementsX} from "../elementsLayout/EmbeddedElementsX";
import {BorderIndexMaxBottom, EmbeddedBorderIndexMaxBottom} from "../elementsLayout/BorderIndexMaxBottom";
import {EmbeddedBorderIndexMaxTop} from "../elementsLayout/BorderIndexMaxTop";
import {BorderIndexBottom} from "../elementsLayout/BorderIndexBottom";
import {BorderIndexRight} from "../elementsLayout/BorderIndexRight";
import {EmbeddedElementsY} from "../elementsLayout/EmbeddedElementsY";
import {ElementKey} from "../elementsLayout/ElementKey";
import {EmbeddedMidPathSegmentY} from "../edgesLayout/MidPathSegmentOffsetYAggregates";
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";
import {renderShape} from "./renderShape";

type Props = Container<
    ElementKey &
    RequiredNodeDataGetElementLeftX &
    RequiredNodeDataGetElementTopY &
    EmbeddedElementsX & EmbeddedElementsY &
    BorderIndexRight &
    EmbeddedBorderIndexMaxTop &
    BorderIndexBottom & BorderIndexMaxBottom & EmbeddedBorderIndexMaxBottom &
    EmbeddedMidPathSegmentY>;

export const ContainerComponent: React.FC<Props> = container => {
    let x = getElementLeftX(container);
    let y = getElementTopY(container);
    let width = container.embeddedElementsX * ELEMENT_WIDTH + (container.embeddedElementsX - 1) * HORIZONTAL_SPACING
        + ((container.embeddedElementsX - 1) * container.borderIndexMaxX * 2 + container.borderIndexLeft + container.borderIndexRight) * BORDER_SPACING_X
        + (container.embeddedElementsX - 1) * container.crossLayerPathSegmentOffsetMaxX * EDGE_SPACING;
    let height = container.embeddedElementsY * ELEMENT_HEIGHT +
        (container.embeddedElementsY - 1) * VERTICAL_SPACING +
        container.borderIndexTop * BORDER_SPACING_TOP +
        container.embeddedBorderIndexMaxTop * BORDER_SPACING_TOP +
        container.embeddedBorderIndexMaxBottom * BORDER_SPACING_BOTTOM +
        container.embeddedMidPathSegmentY * EDGE_SPACING +
        container.borderIndexBottom * BORDER_SPACING_BOTTOM;
    return (
        <g key={container.elementKey}>
            {(container.border === "rectangle") && renderShape("rectangle", x, y, width, height, "none")}

            {(container.border === "deployment-box") &&
            <g>
                <path d={
                    "M " + (x + DEPLOYMENT_BOX_INDENT) + " " + (y + DEPLOYMENT_BOX_INDENT) + " " +
                    "L " + (x + DEPLOYMENT_BOX_INDENT + DEPLOYMENT_BOX_3D_OFFSET) + " " + y + " " +
                    "H " + (x + width - DEPLOYMENT_BOX_INDENT + DEPLOYMENT_BOX_3D_OFFSET) + " " +
                    "V " + (y + height - 2 * DEPLOYMENT_BOX_INDENT) + " " +
                    "L " + (x + width - DEPLOYMENT_BOX_INDENT) + " " + (y + height - DEPLOYMENT_BOX_INDENT) +
                    "H " + (x + DEPLOYMENT_BOX_INDENT) + " " +
                    "Z"
                }
                      stroke="black"
                      strokeWidth={STROKE_WIDTH}
                      fill="none"
                />
                <path d={
                    "M " + (x + DEPLOYMENT_BOX_INDENT) + " " + (y + DEPLOYMENT_BOX_INDENT) + " " +
                    "H " + (x + width - DEPLOYMENT_BOX_INDENT) + " " +
                    "V " + (y + height - DEPLOYMENT_BOX_INDENT)
                }
                      stroke="black"
                      strokeWidth={STROKE_WIDTH}
                      fill="none"
                />
                <path d={
                    "M " + (x + width - DEPLOYMENT_BOX_INDENT) + " " + (y + DEPLOYMENT_BOX_INDENT) + " " +
                    "L " + (x + width - DEPLOYMENT_BOX_INDENT + DEPLOYMENT_BOX_3D_OFFSET) + " " + y
                }
                      stroke="black"
                      strokeWidth={STROKE_WIDTH}
                      fill="none"
                />
            </g>
            }

            {container.name &&
            <g transform={"translate("
            + (x + BORDER_SPACING_X) + " " + (y + TEXT_PADDING) + ")"}>
                <text
                    x={0}
                    y={0}
                    fill="black"
                    clipPath={"url(#clip-element-text-" + container.elementKey + ")"}
                    fontSize={12}
                >
                    {container.name.split("\n").map((line, lineIndex) => (
                        <tspan key={container.elementKey + "T" + lineIndex} x="0" dy="1.2em">{line}</tspan>
                    ))}
                </text>

                <clipPath id={"clip-element-text-" + container.elementKey}>
                    <rect
                        x={0}
                        y={0}
                        width={width - 2 * BORDER_SPACING_X}
                        height={BORDER_SPACING_TOP}/>
                </clipPath>
            </g>
            }
        </g>
    );
};