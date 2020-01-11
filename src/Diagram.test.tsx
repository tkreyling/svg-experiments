import React from 'react';
import {render} from '@testing-library/react';
import {Diagram} from './App';

test('renders 7 rectangles', () => {
    const layers = [
        [["element 1", "element 2", "an element with long text"], ["element 4"]],
        [["element 1", "element 2", "element 3"]]
    ].map(layer => {
        return layer.map(group => {
            return group.map(name => {
                return {name: name}
            });
        });
    });
    const {getAllByTestId} = render(<Diagram layers={layers} edges={[]}/>);
    const rects = getAllByTestId("rect");
    expect(rects).toHaveLength(7);
});
