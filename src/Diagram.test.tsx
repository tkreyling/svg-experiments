import React from 'react';
import {render} from '@testing-library/react';
import {Stack, Node} from './App';
import {stringsToNodes} from "./stringsToNodes";
import {Diagram} from "./Diagram";

test('renders 7 rectangles', () => {
    const stack: Stack<Node, unknown> = stringsToNodes([
        [
            {name: "group 1", kind: 'group', elements: ["element 1", "element 2", "an element with long text"]},
            {name: "group 2", kind: 'group', elements: ["element 4"]}
        ],
        [
            {name: "group 3", kind: 'group', elements: ["element 1", "element 2", "element 3"]}
        ]
    ]);
    const {getAllByTestId} = render(<Diagram stack={stack} edges={[]}/>);
    const rects = getAllByTestId("rect");
    expect(rects).toHaveLength(7);
});
