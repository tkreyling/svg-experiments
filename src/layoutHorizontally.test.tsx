import {ELEMENT_WIDTH, HORIZONTAL_SPACING, layoutHorizontally} from "./App";

test('no element results in no layouted elements', () => {
  expect(layoutHorizontally([], 0))
      .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
  expect(layoutHorizontally(["element"], 0))
      .toStrictEqual([
        {x: 0, y: 0, element: "element", key: "0_0"}
      ])
});

test('two elements are layouted right beside each other', () => {
  expect(layoutHorizontally(["element", "element"], 0))
      .toStrictEqual([
        {x: 0, y: 0, element: "element", key: "0_0"},
        {x: ELEMENT_WIDTH + HORIZONTAL_SPACING, y: 0, element: "element", key: "0_1"}
      ])
});
