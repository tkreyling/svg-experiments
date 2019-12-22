import {ELEMENT_WIDTH, HORIZONTAL_SPACING, layoutHorizontally, MARGIN_SIDE, MARGIN_TOP, widthOfElements} from "./App";

test('no element results in no layouted elements', () => {
    let elements: string[] = [];
    expect(layoutHorizontally(elements, 0, widthOfElements(elements)))
      .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
    let elements = ["element"];
    expect(layoutHorizontally(elements, 0, widthOfElements(elements)))
      .toStrictEqual([
        {x: MARGIN_SIDE, y: MARGIN_TOP, element: "element", key: "0_0"}
      ])
});

test('two elements are layouted right beside each other', () => {
    let elements = ["element", "element"];
    expect(layoutHorizontally(elements, 0, widthOfElements(elements)))
      .toStrictEqual([
        {x: MARGIN_SIDE, y: MARGIN_TOP, element: "element", key: "0_0"},
        {x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING, y: MARGIN_TOP, element: "element", key: "0_1"}
      ])
});
