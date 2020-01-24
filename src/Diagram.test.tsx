import React from 'react';
import {render} from '@testing-library/react';
import {Diagram, Stack, stringsToNodes, Node} from './App';

test('renders 7 rectangles', () => {
    const stack: Stack<Node, unknown> = stringsToNodes([
        [
            {name: "group 1", orientation: 'columns', elements: ["element 1", "element 2", "an element with long text"]},
            {name: "group 2", orientation: 'columns', elements: ["element 4"]}
        ],
        [
            {name: "group 3", orientation: 'columns', elements: ["element 1", "element 2", "element 3"]}
        ]
    ]);
    const {getAllByTestId} = render(<Diagram stack={stack} edges={[]}/>);
    const rects = getAllByTestId("rect");
    expect(rects).toHaveLength(7);
});
