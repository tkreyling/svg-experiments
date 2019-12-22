import {ELEMENT_WIDTH, HORIZONTAL_SPACING, layoutHorizontally, MARGIN_SIDE, MARGIN_TOP} from "./App";

test('no element results in no layouted elements', () => {
  expect(layoutHorizontally([], 0))
      .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
  expect(layoutHorizontally(["element"], 0))
      .toStrictEqual([
        {x: MARGIN_SIDE, y: MARGIN_TOP, element: "element", key: "0_0"}
      ])
});

test('two elements are layouted right beside each other', () => {
  expect(layoutHorizontally(["element", "element"], 0))
      .toStrictEqual([
        {x: MARGIN_SIDE, y: MARGIN_TOP, element: "element", key: "0_0"},
        {x: MARGIN_SIDE + ELEMENT_WIDTH + HORIZONTAL_SPACING, y: MARGIN_TOP, element: "element", key: "0_1"}
      ])
});
