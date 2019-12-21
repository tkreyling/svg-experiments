import React from 'react';
import './App.css';

type RectProps = {
  x: number
  y: number
}

const Rect: React.FC<RectProps> = (props) => {
  return (
    <rect x={props.x} y={props.y} width="300" height="100" fill="rgb(0,0,255)" strokeWidth={3} stroke="rgb(0,0,0)" />
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <svg viewBox="0 0 850 600">
        <Rect x={150} y={150}/>
        <Rect x={250} y={260}/>
      </svg>
    </div>
  );
};

export default App;
