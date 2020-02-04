import React from "react";
import {ELEMENT_HEIGHT, Group, GROUP_MARGIN_SIDE, GroupPosition, Height, Node, STROKE_WIDTH, width, X, Y} from "./App";

export const GroupShape: React.FC<Group<Node, unknown> & GroupPosition & X & Y & Height> = group => {
    return (
        <g key={group.key}>
            <rect
                x={group.x} y={group.y}
                width={width(group)}
                height={group.height}
                fill="none" strokeWidth={STROKE_WIDTH} stroke="grey"/>

            <text x={group.x + GROUP_MARGIN_SIDE} y={group.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + group.key + ")"}>{group.name}
            </text>

            <clipPath id={"clip-element-text-" + group.key}>
                <rect
                    x={group.x + GROUP_MARGIN_SIDE} y={group.y}
                    width={width(group) - 2 * GROUP_MARGIN_SIDE}
                    height={ELEMENT_HEIGHT}/>
            </clipPath>
        </g>
    );
};