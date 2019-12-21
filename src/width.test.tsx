import {width, ELEMENT_WIDTH, HORIZONTAL_SPACING} from "./App";

test('no element has no width', () => {
  expect(width([]))
      .toBe(0)
});

test('one element has the general fixed width', () => {
  expect(width(["element"]))
      .toBe(ELEMENT_WIDTH)
});

test('two elements have the width of both of them and a additional spacing', () => {
  expect(width(["element", "element"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  expect(width(["element", "element", "element"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});
