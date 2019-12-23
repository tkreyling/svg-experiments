import {ELEMENT_WIDTH, HORIZONTAL_SPACING, layoutHorizontally, MARGIN_SIDE, MARGIN_TOP, widthOfElements} from "./App";

test('no element results in no layouted elements', () => {
    expect(layoutHorizontally([], widthOfElements([])))
      .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
    let elements = [
        {name: "element", key: "0_0", index: 0, layerIndex: 0}
    ];
    expect(layoutHorizontally(elements, widthOfElements(elements)))
      .toStrictEqual([
        {
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            name: "element",
            key: "0_0",
            index: 0,
            layerIndex: 0
        }
      ])
});

test('two elements are layouted right beside each other', () => {
    let elements = [
        {name: "element", key: "0_0", index: 0, layerIndex: 0},
        {name: "element", key: "0_1", index: 1, layerIndex: 0}
    ];
    expect(layoutHorizontally(elements, widthOfElements(elements)))
      .toStrictEqual([
        {
            x: MARGIN_SIDE,
            y: MARGIN_TOP,
            name: "element",
            key: "0_0",
            index: 0,
            layerIndex: 0
        },
        {
            x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING,
            y: MARGIN_TOP,
            name: "element",
            key: "0_1",
            index: 1,
            layerIndex: 0
        }
      ])
});
