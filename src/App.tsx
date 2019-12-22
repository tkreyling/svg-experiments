import React from 'react';
import './App.css';

type RectProps = {
    x: number
    y: number
    element: string
    key: string
}

export const MARGIN_TOP = 5;
export const MARGIN_SIDE = 5;
export const ELEMENT_WIDTH = 100;
export const ELEMENT_HEIGHT = 40;
export const HORIZONTAL_SPACING = 10;
export const VERTICAL_SPACING = 10;
export const TEXT_PADDING = 5;

export function widthOfLayers(layers: any[][]) {
    return Math.max(...layers.map(widthOfElements));
}

export function widthOfElements(elements: any[]) {
    const n = elements.length;
    if (n === 0) return 0;
    return n*ELEMENT_WIDTH + (n - 1)*HORIZONTAL_SPACING;
}

function height(layers: string[][]) {
    let n = layers.length;
    return n*ELEMENT_HEIGHT + (n - 1)*VERTICAL_SPACING;
}

export function layout(layers: string[][]): RectProps[][] {
    let fullWidth = widthOfLayers(layers);
    return layers.map((elements, layerIndex) => {
        return layoutHorizontally(elements, layerIndex, fullWidth)
    });
}

export function layoutHorizontally(elements: string[], layerIndex: number, fullWidth: number): RectProps[] {
    let offsetToCenter = (fullWidth - widthOfElements(elements)) / 2;
    return elements.map((element, index) => {
        return {
            x: index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + MARGIN_SIDE + offsetToCenter,
            y: layerIndex * (ELEMENT_HEIGHT + VERTICAL_SPACING) + MARGIN_TOP,
            element: element,
            key: layerIndex + "_" + index
        }
    });
}

export const Rect: React.FC<RectProps> = (props) => {
  return (
      <g key={props.key}>
          <rect data-testid="rect"
                x={props.x} y={props.y}
                width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
                fill="lightgrey" strokeWidth={1} stroke="black"/>

          <text x={props.x + TEXT_PADDING } y={props.y + ELEMENT_HEIGHT / 2} fill="black"
                clipPath={"url(#clip-element-text-" + props.key + ")"}>{props.element}
          </text>

          <clipPath id={"clip-element-text-" + props.key}>
              <rect x={props.x + TEXT_PADDING} y={props.y} width={ELEMENT_WIDTH - 2 * TEXT_PADDING} height={ELEMENT_HEIGHT}/>
          </clipPath>
      </g>
  );
};

const layers = [
    ["element 1", "element 2", "an element with long text", "element 4"],
    ["element 1", "element 2", "element 3"],
    ["element 1", "element 2", "element 3", "element 4", "element 5"]
];

type DiagramProps = {
    layers: string[][]
}

export const Diagram: React.FC<DiagramProps> = (props) => {
    return (
        <svg viewBox={"0 0 " +
        (widthOfLayers(props.layers) + 2 * MARGIN_SIDE) + " " +
        (height(props.layers) + 2 * MARGIN_TOP)}>
            {layout(props.layers).flat().map(Rect)}
        </svg>
    );
};

const App: React.FC = () => {
    return (
        <div className="App">
            <Diagram layers={layers}/>
        </div>
    );
};

export default App;
