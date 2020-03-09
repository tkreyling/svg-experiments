import React from "react";
import {
    DB_CYLINDER_ELLIPSE_Y,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    QUEUE_CYLINDER_ELLIPSE_X,
    STROKE_WIDTH,
    STROKE_WIDTH_SELECTED,
    SYMBOL_SPACING,
    SYMBOL_WIDTH,
    TEXT_PADDING
} from "../styling";
import {ElementKey} from "../elementsLayout/ElementKey";
import {Node} from "../newGraphModel"
import {getElementLeftX, RequiredNodeDataGetElementLeftX} from "./getElementLeftX";
import {getElementTopY, RequiredNodeDataGetElementTopY} from "./getElementTopY";
import {ComponentSymbol} from "./Symbols";

type Props = {
    node : Node & ElementKey & RequiredNodeDataGetElementLeftX & RequiredNodeDataGetElementTopY,
    onNodeClick: (node: Node) => void
};

function renderShape(
    shape: "rectangle" | "db-cylinder" | "queue-cylinder" | undefined,
    x: number,
    y: number,
    width: number,
    height: number,
    selected?: boolean,
    onClick?: () => void
) {
    let strokeWidth = selected ? STROKE_WIDTH_SELECTED: STROKE_WIDTH;

    return <>
        {shape === "rectangle" &&
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={onClick}
            fill="white"
            strokeWidth={strokeWidth}
            stroke="black"
        />
        }
        {shape === "db-cylinder" &&
        <g>
            <path d={
                "M " + x + " " + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                "A " + (width / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,1 " + (x + width) + "," + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                "V " + (y + height - DB_CYLINDER_ELLIPSE_Y) + " " +
                "A " + (width / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,1 " + x + "," + (y + height - DB_CYLINDER_ELLIPSE_Y) + " " +
                "Z"
            }
                  onClick={onClick}
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="white"
            />
            <path d={
                "M " + x + " " + (y + DB_CYLINDER_ELLIPSE_Y) + " " +
                "A " + (width / 2) + "," + DB_CYLINDER_ELLIPSE_Y + " 0 1,0 " + (x + width) + "," + (y + DB_CYLINDER_ELLIPSE_Y)
            }
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="none"
            />
        </g>
        }
        {shape === "queue-cylinder" &&
        <g>
            <path d={
                "M " + (x + QUEUE_CYLINDER_ELLIPSE_X) + " " + y + " " +
                "A " + QUEUE_CYLINDER_ELLIPSE_X + "," + (height / 2) + " 0 1,0 " + (x + QUEUE_CYLINDER_ELLIPSE_X) + "," + (y + height) + " " +
                "H " + (x + width - QUEUE_CYLINDER_ELLIPSE_X) + " " +
                "A " + QUEUE_CYLINDER_ELLIPSE_X + "," + (height / 2) + " 0 1,0 " + (x + width - QUEUE_CYLINDER_ELLIPSE_X) + "," + y + " " +
                "Z"
            }
                  onClick={onClick}
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="white"
            />
            <path d={
                "M " + (x + QUEUE_CYLINDER_ELLIPSE_X) + " " + y + " " +
                "A " + QUEUE_CYLINDER_ELLIPSE_X + "," + (height / 2) + " 0 1,1 " + (x + QUEUE_CYLINDER_ELLIPSE_X) + "," + (y + height)
            }
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="none"
            />
        </g>
        }
    </>;
}

export const NodeComponent: React.FC<Props> = props => {
    let node = props.node;
    if (!node.visible) return null;

    let x = getElementLeftX(node);
    let y = getElementTopY(node);


    return (
        <g key={node.elementKey}>
            {renderShape(node.shape, x, y, ELEMENT_WIDTH, ELEMENT_HEIGHT, node.selected, () => props.onNodeClick(node))}
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