import React from 'react';
import './App.css';

type RectProps = {
  x: number
  y: number
}

export const ELEMENT_WIDTH = 100;
export const ELEMENT_HEIGHT = 40;
export const HORIZONTAL_SPACING = 10;

export function width(elements: any[]) {
  const n = elements.length;
  if (n === 0) return 0;
  return n*ELEMENT_WIDTH + (n - 1)*HORIZONTAL_SPACING;
}

export function layoutHorizontally(elements: any[]): RectProps[] {
  return elements.map((element, index) => {
    return {x: index * (ELEMENT_WIDTH + HORIZONTAL_SPACING), y: 0}
  });
}

export const Rect: React.FC<RectProps> = (props) => {
  return (
    <rect data-testid="rect"
          x={props.x} y={props.y}
          width={ELEMENT_WIDTH} height={ELEMENT_HEIGHT}
          fill="rgb(0,0,255)" strokeWidth={3} stroke="rgb(0,0,0)" />
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <svg viewBox="0 0 850 600">
        {layoutHorizontally(["element", "element"]).map(Rect)}
      </svg>
    </div>
  );
};

export default App;
