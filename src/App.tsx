import React from 'react';
import './App.css';

export type Coordinates = {
    x: number
    y: number
}

export type LayerPosition = {
    key: string
    index: number
    layerIndex: number
}

export type Node = {
    name: string
}

type Edge<T> = {
    from: T
    to: T
}

export const MARGIN_TOP = 5;
export const MARGIN_SIDE = 5;
export const ELEMENT_WIDTH = 100;
export const ELEMENT_HEIGHT = 40;
export const HORIZONTAL_SPACING = 10;
export const VERTICAL_SPACING = 20;
export const TEXT_PADDING = 5;

export function widthOfLayers(layers: any[][]) {
    return Math.max(...layers.map(widthOfElements));
}

export function widthOfElements(elements: any[]) {
    const n = elements.length;
    if (n === 0) return 0;
    return n*ELEMENT_WIDTH + (n - 1)*HORIZONTAL_SPACING;
}

function heightOfNodes(layers: Node[][]) {
    let n = layers.length;
    return n*ELEMENT_HEIGHT + (n - 1)*VERTICAL_SPACING;
}

function addLayerPosition(layers: Node[][]): (Node & LayerPosition)[][] {
    return layers.map((elements, layerIndex) => {
        return elements.map((element, index) => {
            return Object.assign(element, {
                key: layerIndex + "_" + index,
                index: index,
                layerIndex: layerIndex
            });
        });
    });
}

export function layout(layers: (Node & LayerPosition)[][]): (Node & LayerPosition & Coordinates)[][] {
    let fullWidth = widthOfLayers(layers);
    return layers.map((elements) => {
        return layoutHorizontally(elements, fullWidth)
    });
}

export function layoutHorizontally(elements: (Node & LayerPosition)[], fullWidth: number): (Node & LayerPosition & Coordinates)[] {
    let offsetToCenter = (fullWidth - widthOfElements(elements)) / 2;
    return elements.map((element) => {
        return Object.assign(element, {
            x: element.index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + MARGIN_SIDE + offsetToCenter,
            y: element.layerIndex * (ELEMENT_HEIGHT + VERTICAL_SPACING) + MARGIN_TOP
        });
    });
}

export const Rect: React.FC<Node & LayerPosition & Coordinates> = (props) => {
    return (
        <g key={props.key}>
            <rect data-testid="rect"
                  x={props.x} y={props.y}
                  width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
                  fill="lightgrey" strokeWidth={1} stroke="black"/>

            <text x={props.x + TEXT_PADDING } y={props.y + ELEMENT_HEIGHT / 2} fill="black"
                  clipPath={"url(#clip-element-text-" + props.key + ")"}>{props.name}
            </text>

            <clipPath id={"clip-element-text-" + props.key}>
                <rect x={props.x + TEXT_PADDING} y={props.y} width={ELEMENT_WIDTH - 2 * TEXT_PADDING} height={ELEMENT_HEIGHT}/>
            </clipPath>
        </g>
    );
};

export const Path: React.FC<Edge<LayerPosition & Coordinates>> = (props) => {
    let fromIsUpper = props.from.layerIndex <= props.to.layerIndex;
    let upper = fromIsUpper ? props.from : props.to;
    let lower = fromIsUpper ? props.to : props.from;

    let upperNodeX = upper.x + ELEMENT_WIDTH / 2;
    let upperNodeY = upper.y + ELEMENT_HEIGHT;
    let upperNodeEdgesY = upper.y + ELEMENT_HEIGHT + VERTICAL_SPACING / 2;
    let lowerNodeX = lower.x + ELEMENT_WIDTH / 2;
    let lowerNodeY = lower.y;
    return (
        <path d={
            "M " + upperNodeX + " " + upperNodeY + " " +
            "L " + upperNodeX + " " + upperNodeEdgesY + " " +
            "L " + lowerNodeX + " " + upperNodeEdgesY + " " +
            "L " + lowerNodeX + " " + lowerNodeY
        }
              stroke="black"
              strokeWidth={1}
              fill="none"
        />
    );
};

const layers: Node[][] = [
    ["element 1", "element 2", "an element with long text", "element 4"],
    ["element 1", "element 2", "element 3"],
    ["element 1", "element 2", "element 3", "element 4", "element 5"]
].map(layer => {
    return layer.map(name => {
        return {name: name}
    })
});

const edges = [
    {from: layers[0][1], to: layers[1][0]},
    {from: layers[0][2], to: layers[1][2]},
    {from: layers[1][2], to: layers[2][2]},
    {from: layers[2][0], to: layers[1][0]}
];

type DiagramProps = {
    layers: Node[][]
    edges: Edge<Node>[]
}

export const Diagram: React.FC<DiagramProps> = (props) => {
    let positioned = addLayerPosition(props.layers);
    let nodes = layout(positioned);
    let flattenedNodes = nodes.flat();
    let paths = props.edges as unknown as Edge<LayerPosition & Coordinates>[];
    return (
        <svg viewBox={"0 0 " +
        (widthOfLayers(props.layers) + 2 * MARGIN_SIDE) + " " +
        (heightOfNodes(props.layers) + 2 * MARGIN_TOP)}>
            {flattenedNodes.map(Rect)}
            {paths.map(Path)}
        </svg>
    );
};

const App: React.FC = () => {
    return (
        <div className="App">
            <Diagram layers={layers} edges={edges}/>
        </div>
    );
};

export default App;
