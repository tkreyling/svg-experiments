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

export function layout(layers: string[][]): RectProps[][] {
    return layers.map((elements, layerIndex) => {
        return layoutHorizontally(elements, layerIndex)
    });
}

export function layoutHorizontally(elements: string[], layerIndex: number): RectProps[] {
    return elements.map((element, index) => {
        return {
            x: index * (ELEMENT_WIDTH + HORIZONTAL_SPACING) + MARGIN_SIDE,
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
                fill="rgb(0,0,255)" strokeWidth={1} stroke="rgb(0,0,0)"/>

          <text x={props.x + TEXT_PADDING } y={props.y + ELEMENT_HEIGHT / 2} fill="red"
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
    ["element 1", "element 2", "element 3"]
];

const App: React.FC = () => {
    return (
        <div className="App">
            <svg viewBox={"0 0 " + (widthOfLayers(layers) + 2 * MARGIN_SIDE) + " 100"}>
                {layout(layers).flat().map(Rect)}
            </svg>
        </div>
    );
};

export default App;
