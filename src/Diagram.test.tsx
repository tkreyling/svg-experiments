import React from 'react';
import {render} from '@testing-library/react';
import {Diagram, stringsToNodes} from './App';

test('renders 7 rectangles', () => {
    const layers = stringsToNodes([
        [
            {name: "group 1", elements: ["element 1", "element 2", "an element with long text"]},
            {name: "group 2", elements: ["element 4"]}
        ],
        [
            {name: "group 3", elements: ["element 1", "element 2", "element 3"]}
        ]
    ]);
    const {getAllByTestId} = render(<Diagram layers={layers} edges={[]}/>);
    const rects = getAllByTestId("rect");
    expect(rects).toHaveLength(7);
});
