import {
  width,
  ELEMENT_WIDTH,
  HORIZONTAL_SPACING,
  GROUP_MARGIN_SIDE,
  Layer,
  Stack
} from "./App";

test('no element has no width', () => {
    expect(width({orientation: 'columns', elements: []}))
        .toBe(0)
});

test('one element has the general fixed width', () => {
    let elements: Layer<unknown, unknown> = {
        orientation: 'columns',
        elements: [{name: "group 1", orientation: 'columns', elements: ["element"]}]
    };
    expect(width(elements))
        .toBe(ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements have the width of both of them and a additional spacing', () => {
  let elements: Layer<unknown, unknown> = {
    orientation: 'columns',
    elements: [{name: "group 1", orientation: 'columns', elements: ["element", "element"]}]
  };
  expect(width(elements))
        .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements in two groups have the width of both of them and a additional spacing', () => {
  let elements: Layer<unknown, unknown> = {
    orientation: 'columns',
    elements: [
      {name: "group 1", orientation: 'columns', elements: ["element"]},
      {name: "group 2", orientation: 'columns', elements: ["element"]}
    ]
  };
  expect(width(elements))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 4)
});

test('three elements in three groups have the width of both of them and two additional spacings', () => {
  let elements: Layer<unknown, unknown> = {
    orientation: 'columns',
    elements: [
      {name: "group 1", orientation: 'columns', elements: ["element"]},
      {name: "group 2", orientation: 'columns', elements: ["element"]},
      {name: "group 3", orientation: 'columns', elements: ["element"]}
    ]
  };
  expect(width(elements))
      .toBe(3 * ELEMENT_WIDTH + 2 * HORIZONTAL_SPACING + GROUP_MARGIN_SIDE * 6)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  let elements: Layer<unknown, unknown> = {
    orientation: 'columns',
    elements: [{name: "group 1", orientation: 'columns', elements: ["element", "element", "element"]}]
  };
  expect(width(elements))
        .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('for multiple layer the width of a layer is the max width of all layers', () => {
  let elements: Stack<unknown, unknown> = {
    orientation: 'rows', elements: [
      {
        orientation: 'columns',
        elements: [{name: "group 1", orientation: 'columns', elements: ["element", "element", "element"]}]
      },
      {
        orientation: 'columns',
        elements: [{name: "group 2", orientation: 'columns', elements: ["element", "element"]}]
      }
    ]
  };
  expect(width(elements))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});