import React from "react";
import {ELEMENT_HEIGHT, ELEMENT_WIDTH, STROKE_WIDTH, SYMBOL_SPACING, SYMBOL_WIDTH, TEXT_PADDING} from "../styling";
import {ElementKey} from "../elementsLayout/ElementKey";
import {Node} from "../newGraphModel"
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";
import {ComponentSymbol} from "./Symbols";

type Props = Node & ElementKey &
    RequiredNodeDataGetElementLeftX &
    RequiredNodeDataGetElementTopY;

export const NodeShape: React.FC<Props> = node => {
    if (!node.visible) return null;

    let x = getElementLeftX(node);
    let y = getElementTopY(node);

    return (
        <g key={node.elementKey}>
            <rect
                x={x} y={y}
                width={ELEMENT_WIDTH}
                height={ELEMENT_HEIGHT}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="black"/>
            {node.name &&
            <g>
                <text
                    x={x + TEXT_PADDING} y={y + ELEMENT_HEIGHT / 2}
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