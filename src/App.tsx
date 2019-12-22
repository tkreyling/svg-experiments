import React from 'react';
import './App.css';

type RectProps = {
    x: number
    y: number
    element: string
    key: number
}

export const ELEMENT_WIDTH = 100;
export const ELEMENT_HEIGHT = 40;
export const HORIZONTAL_SPACING = 10;
export const TEXT_PADDING = 5;

export function width(elements: any[]) {
    const n = elements.length;
    if (n === 0) return 0;
    return n*ELEMENT_WIDTH + (n - 1)*HORIZONTAL_SPACING;

}
export function layoutHorizontally(elements: string[]): RectProps[] {
    return elements.map((element, index) => {
    return {x: index * (ELEMENT_WIDTH + HORIZONTAL_SPACING), y: 0, element: element, key: index}
  });

}
export const Rect: React.FC<RectProps> = (props) => {
  return (
      <g key={props.key}>
          <rect data-testid="rect"
                x={props.x} y={props.y}
                width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
                fill="rgb(0,0,255)" strokeWidth={3} stroke="rgb(0,0,0)"/>

          <text x={props.x + TEXT_PADDING } y={props.y + ELEMENT_HEIGHT / 2} fill="red"
                clipPath={"url(#clip-element-text-" + props.key + ")"}>{props.element}
          </text>

          <clipPath id={"clip-element-text-" + props.key}>
              <rect x={props.x + TEXT_PADDING} y={props.y} width={ELEMENT_WIDTH - 2 * TEXT_PADDING} height={ELEMENT_HEIGHT}/>
          </clipPath>
      </g>
  );
};

const elements = ["element 1", "element 2", "an element with long text", "element 4"];

const App: React.FC = () => {
  return (
    <div className="App">
      <svg viewBox={"0 0 " + width(elements) + " 100"}>
        {layoutHorizontally(elements).map(Rect)}
      </svg>
    </div>
  );
};

export default App;
