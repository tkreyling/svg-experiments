import React from "react";
import {
    BORDER_SPACING_X,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    STROKE_WIDTH,
    SYMBOL_SPACING,
    SYMBOL_WIDTH,
    TEXT_PADDING
} from "../styling";
import {ElementKey} from "../elementsLayout/ElementKey";
import {Node} from "../newGraphModel"
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";
import {ComponentSymbol} from "./Symbols";

const DB_CYLINDER_ELLIPSE_Y = BORDER_SPACING_X * 0.5;

type Props = Node & ElementKey &
    RequiredNodeDataGetElementLeftX &
    RequiredNodeDataGetElementTopY;

export const NodeShape: React.FC<Props> = node => {
    if (!node.visible) return null;

    let x = getElementLeftX(node);
    let y = getElementTopY(node);

    return (
        <g key={node.elementKey}>
            {node.shape === "rectangle" &&
            <rect
                x={x} y={y}
                width={ELEMENT_WIDTH}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="black"/>
            }
            {node.shape === "db-cylinder" &&
            <g>
                <path d={
                    "M " + x + " " + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                    "A " + (ELEMENT_WIDTH / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,1 " + (x + ELEMENT_WIDTH) + "," + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                    "V " + (y + ELEMENT_HEIGHT - DB_CYLINDER_ELLIPSE_Y) + " " +
                    "A " + (ELEMENT_WIDTH / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,1 " + x + "," + (y + ELEMENT_HEIGHT - DB_CYLINDER_ELLIPSE_Y) + " " +
                    "Z"
                }
                      stroke="black"
                      strokeWidth={STROKE_WIDTH}
                      fill="none"
                />
                <path d={
                    "M " + x + " " + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                    "A " + (ELEMENT_WIDTH / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,0 " + (x + ELEMENT_WIDTH) + "," + (y + DB_CYLINDER_ELLIPSE_Y)
                }
                      stroke="black"
                      strokeWidth={STROKE_WIDTH}
                      fill="none"
                />
            </g>
            }
            {node.name &&
            <g>
                <text
                    x={x + TEXT_PADDING} y={y + ELEMENT_HEIGHT * (node.shape === "db-cylinder" ? 0.7 : 0.5)}
                    fill="black"
                    clipPath={"url(#clip-element-text-" + node.elementKey + ")"}>{node.name}
                </text>

                <clipPath id={"clip-element-text-" + node.elementKey}>
                    <rect
                        x={x + TEXT_PADDING} y={y}
                        width={ELEMENT_WIDTH - 2 * TEXT_PADDING - (node.symbol ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)}
                        height={ELEMENT_HEIGHT}/>
                </clipPath>
            </g>
            }
            {node.symbol &&
            <ComponentSymbol
                symbolKey={node.elementKey + "CS"}
                x={x + ELEMENT_WIDTH - SYMBOL_WIDTH - SYMBOL_SPACING}
                y={y + SYMBOL_SPACING}
                width={SYMBOL_WIDTH}/>
            }
        </g>
    );
};