import React from "react";
import {width} from "./width";
import {ELEMENT_HEIGHT, STROKE_WIDTH, SYMBOL_SPACING, SYMBOL_WIDTH, TEXT_PADDING} from "./styling";
import {LayerPosition, Node, X, Y} from "./graphModel";
import {ComponentSymbol} from "./Symbols";

export const NodeShape: React.FC<Node & LayerPosition & X & Y> = node => {
    let isComponent = node.symbol === "component";
    return (
        <g key={node.key}>
            <rect data-testid="rect"
                  x={node.x} y={node.y}
                  width={width(node)} height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={STROKE_WIDTH} stroke="black"/>

            <text x={node.x + TEXT_PADDING} y={node.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + node.key + ")"}>{node.name}
            </text>

            <clipPath id={"clip-element-text-" + node.key}>
                <rect
                    x={node.x + TEXT_PADDING} y={node.y}
                    width={width(node) - 2 * TEXT_PADDING - (isComponent ? (SYMBOL_WIDTH + SYMBOL_SPACING) : 0)}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>

            {isComponent ?
                <ComponentSymbol
                    symbolKey={node.key + "CS"}
                    x={node.x + width(node) - SYMBOL_WIDTH - SYMBOL_SPACING}
                    y={node.y + SYMBOL_SPACING}
                    width={SYMBOL_WIDTH}/>
                : ""}
        </g>
    );
};