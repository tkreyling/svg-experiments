import React from 'react';
import './App.css';

const data = [
  [1, 3],
  [2, 5],
  [3, 2],
  [4, 16],
  [18, 5]
];

const widht = 800;
const height = 600;

type RectProps = {
  x: number
  y: number
}

const Rect: React.FC<RectProps> = (props) => {
  return (
    <rect x={props.x} y={props.y} width="300" height="100" fill="rgb(0,0,255)" stroke-width={3} stroke="rgb(0,0,0)" />
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <svg viewBox="0 0 850 600">
        <circle cx={50} cy={50} r={10} fill="red" />
        <path d="M 0 0 L 100 100 L 150 100"
          stroke="orange"
          strokeWidth={1}
          fill="none"
        />
        <Rect x={150} y={150}/>
        <Rect x={250} y={260}/>
        <text x="0" y="15" fill="red"><a href="https://heise.de">I'm a div inside a SVG.</a></text>
        <foreignObject className="node" x="46" y="22" width="100" height="100">
          <div><a href="https://heise.de">I'm a div inside a SVG.</a></div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default App;
