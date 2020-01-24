import {widthOfElements, ELEMENT_WIDTH, HORIZONTAL_SPACING, widthOfLayers, GROUP_MARGIN_SIDE} from "./App";

test('no element has no width', () => {
  expect(widthOfElements({orientation: 'columns', elements: []}))
      .toBe(0)
});

test('one element has the general fixed width', () => {
  expect(widthOfElements({orientation: 'columns', elements: [{name: "group 1", elements: ["element"]}]}))
      .toBe(ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements have the width of both of them and a additional spacing', () => {
  expect(widthOfElements({orientation: 'columns', elements: [{name: "group 1", elements: ["element", "element"]}]}))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements in two groups have the width of both of them and a additional spacing', () => {
  expect(widthOfElements({orientation: 'columns', elements: [{name: "group 1", elements: ["element"]}, {name: "group 2", elements: ["element"]}]}))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 4)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  expect(widthOfElements({orientation: 'columns', elements: [{name: "group 1", elements: ["element", "element", "element"]}]}))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('for multiple layer the width of a layer is the max width of all layers', () => {
  expect(widthOfLayers([
    {orientation: 'columns', elements: [{name: "group 1", elements: ["element", "element", "element"]}]},
    {orientation: 'columns', elements: [{name: "group 2", elements: ["element", "element"]}]}
  ]))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});