import {widthOfElements, ELEMENT_WIDTH, HORIZONTAL_SPACING, widthOfLayers, GROUP_MARGIN_SIDE} from "./App";

test('no element has no width', () => {
  expect(widthOfElements([]))
      .toBe(0)
});

test('one element has the general fixed width', () => {
  expect(widthOfElements([{name: "group 1", nodes: ["element"]}]))
      .toBe(ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements have the width of both of them and a additional spacing', () => {
  expect(widthOfElements([{name: "group 1", nodes: ["element", "element"]}]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements in two groups have the width of both of them and a additional spacing', () => {
  expect(widthOfElements([{name: "group 1", nodes: ["element"]}, {name: "group 2", nodes: ["element"]}]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 4)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  expect(widthOfElements([{name: "group 1", nodes: ["element", "element", "element"]}]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('for multiple layer the width of a layer is the max width of all layers', () => {
  expect(widthOfLayers([
    [{name: "group 1", nodes: ["element", "element", "element"]}],
    [{name: "group 2", nodes: ["element", "element"]}]
  ]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});