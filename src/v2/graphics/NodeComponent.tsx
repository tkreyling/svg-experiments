import React from "react";
import {
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    QUEUE_CYLINDER_ELLIPSE_X,
    SYMBOL_SPACING,
    SYMBOL_WIDTH,
    TEXT_PADDING
} from "../styling";
import {ElementKey} from "../elementsLayout/ElementKey";
import {Node} from "../newGraphModel"
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";
import {ComponentSymbol} from "./Symbols";
import {renderShape} from "./renderShape";

type Props = {
    node : Node & ElementKey & RequiredNodeDataGetElementLeftX & RequiredNodeDataGetElementTopY,
    onNodeClick: (node: Node) => void
};

export const NodeComponent: React.FC<Props> = props => {
    let node = props.node;
    if (!node.visible) return null;

    let x = getElementLeftX(node);
    let y = getElementTopY(node);


    return (
        <g key={node.elementKey}>
            {renderShape(node.shape, x, y, ELEMENT_WIDTH, ELEMENT_HEIGHT, "white", node.selected, () => props.onNodeClick(node))}
            {node.name &&
            <g transform={"translate("
            + (x + TEXT_PADDING + (node.shape === "queue-cylinder" ? 2 * QUEUE_CYLINDER_ELLIPSE_X : 0)) + " " + y + ")"}>
                <text
                    x={0}
                    y={ELEMENT_HEIGHT * (node.shape === "db-cylinder" ? 0.3 : 0)}
                    fill="black"
                    clipPath={"url(#clip-element-text-" + node.elementKey + ")"}
                    fontSize={12}
                >
                    {node.name.split("\n").map((line, lineIndex) => (
                        <tspan key={node.elementKey + "T" + lineIndex} x="0" dy="1.2em">{line}</tspan>
                    ))}
                </text>
                <clipPath id={"clip-element-text-" + node.elementKey}>
                    <rect
                        x={0}
                        y={0}
                        width={ELEMENT_WIDTH - 2 * TEXT_PADDING
                        - (node.symbol ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)
                        - (node.shape === "queue-cylinder" ? 2 * QUEUE_CYLINDER_ELLIPSE_X : 0)}
                        height={ELEMENT_HEIGHT * (node.shape === "db-cylinder" ? 0.8 : 1)}/>
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