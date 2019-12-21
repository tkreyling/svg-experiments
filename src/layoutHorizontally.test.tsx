import {ELEMENT_WIDTH, HORIZONTAL_SPACING, layoutHorizontally} from "./App";

test('no element results in no layouted elements', () => {
  expect(layoutHorizontally([]))
      .toStrictEqual([])
});

test('one element is layouted to the origin', () => {
  expect(layoutHorizontally(["service"]))
      .toStrictEqual([{x: 0, y: 0}])
});

test('two elements are layouted right beside each other', () => {
  expect(layoutHorizontally(["service", "service"]))
      .toStrictEqual([{x: 0, y: 0}, {x: ELEMENT_WIDTH + HORIZONTAL_SPACING, y: 0}])
});
