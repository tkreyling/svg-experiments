import {widthOfElements, ELEMENT_WIDTH, HORIZONTAL_SPACING, widthOfLayers} from "./App";

test('no element has no width', () => {
  expect(widthOfElements([]))
      .toBe(0)
});

test('one element has the general fixed width', () => {
  expect(widthOfElements(["element"]))
      .toBe(ELEMENT_WIDTH)
});

test('two elements have the width of both of them and a additional spacing', () => {
  expect(widthOfElements(["element", "element"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  expect(widthOfElements(["element", "element", "element"]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});

test('for multiple layer the width of a layer is the max width of all layers', () => {
  expect(widthOfLayers([["element", "element", "element"], ["element", "element"]]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH)
});