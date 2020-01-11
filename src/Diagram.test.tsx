import React from 'react';
import {render} from '@testing-library/react';
import {Diagram, stringsToNodes} from './App';

test('renders 7 rectangles', () => {
    const layers = stringsToNodes([
        [["element 1", "element 2", "an element with long text"], ["element 4"]],
        [["element 1", "element 2", "element 3"]]
    ]);
    const {getAllByTestId} = render(<Diagram layers={layers} edges={[]}/>);
    const rects = getAllByTestId("rect");
    expect(rects).toHaveLength(7);
});
