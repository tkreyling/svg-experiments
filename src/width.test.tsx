import {width, ELEMENT_WIDTH, HORIZONTAL_SPACING} from "./App";

test('no rectangle has no width', () => {
  expect(width([]))
      .toBe(0)
});

test('one rectangle has the general fixed width', () => {
  expect(width(["rect"]))
      .toBe(ELEMENT_WIDTH)
});

test('two rectangles has the width of both of them and a additional spacing', () => {
  expect(width(["rect", "rect"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});

test('three rectangles has the width of them three of them and two additional spacings', () => {
  expect(width(["rect", "rect", "rect"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});
