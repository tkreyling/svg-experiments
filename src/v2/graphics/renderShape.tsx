import {
    DB_CYLINDER_ELLIPSE_Y, DEPLOYMENT_BOX_3D_OFFSET,
    DEPLOYMENT_BOX_INDENT,
    QUEUE_CYLINDER_ELLIPSE_X,
    STROKE_WIDTH,
    STROKE_WIDTH_SELECTED
} from "../styling";
import React from "react";

export function renderShape(
    shape: "rectangle" | "db-cylinder" | "queue-cylinder" | "deployment-box" | undefined,
    x: number,
    y: number,
    width: number,
    height: number,
    fill = "white",
    selected?: boolean,
    onClick?: () => void
) {
    let strokeWidth = selected ? STROKE_WIDTH_SELECTED : STROKE_WIDTH;

    return <>
        {shape === "rectangle" &&
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            onClick={onClick}
            fill={fill}
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
        {(shape === "deployment-box") &&
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
                  strokeWidth={strokeWidth}
                  onClick={onClick}
                  fill={fill}
            />
            <path d={
                "M " + (x + DEPLOYMENT_BOX_INDENT) + " " + (y + DEPLOYMENT_BOX_INDENT) + " " +
                "H " + (x + width - DEPLOYMENT_BOX_INDENT) + " " +
                "V " + (y + height - DEPLOYMENT_BOX_INDENT)
            }
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="none"
            />
            <path d={
                "M " + (x + width - DEPLOYMENT_BOX_INDENT) + " " + (y + DEPLOYMENT_BOX_INDENT) + " " +
                "L " + (x + width - DEPLOYMENT_BOX_INDENT + DEPLOYMENT_BOX_3D_OFFSET) + " " + y
            }
                  stroke="black"
                  strokeWidth={strokeWidth}
                  fill="none"
            />
        </g>
        }
    </>;
}