import {width} from "./width";
import {ELEMENT_WIDTH, GROUP_MARGIN_SIDE, HORIZONTAL_SPACING} from "./styling";
import {Layer, Node, Stack} from "./graphModel";

test('no element has no width', () => {
    expect(width({kind: 'layer', elements: []}))
        .toBe(0)
});

test('one element has the general fixed width', () => {
    let elements: Layer<Node, unknown> = {
        kind: 'layer',
        elements: [{name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}]}]
    };
    expect(width(elements))
        .toBe(ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements have the width of both of them and a additional spacing', () => {
  let elements: Layer<Node, unknown> = {
    kind: 'layer',
    elements: [{name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}, {kind: "node", name: "element"}]}]
  };
  expect(width(elements))
        .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('two elements in two groups have the width of both of them and a additional spacing', () => {
  let elements: Layer<Node, unknown> = {
    kind: 'layer',
    elements: [
      {name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}]},
      {name: "group 2", kind: 'group', elements: [{kind: "node", name: "element"}]}
    ]
  };
  expect(width(elements))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 4)
});

test('three elements in three groups have the width of both of them and two additional spacings', () => {
  let elements: Layer<Node, unknown> = {
    kind: 'layer',
    elements: [
      {name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}]},
      {name: "group 2", kind: 'group', elements: [{kind: "node", name: "element"}]},
      {name: "group 3", kind: 'group', elements: [{kind: "node", name: "element"}]}
    ]
  };
  expect(width(elements))
      .toBe(3 * ELEMENT_WIDTH + 2 * HORIZONTAL_SPACING + GROUP_MARGIN_SIDE * 6)
});

test('three elements have the width of them three of them and two additional spacings', () => {
  let elements: Layer<Node, unknown> = {
    kind: 'layer',
    elements: [{name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}, {kind: "node", name: "element"}, {kind: "node", name: "element"}]}]
  };
  expect(width(elements))
        .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});

test('for multiple layer the width of a layer is the max width of all layers', () => {
  let elements: Stack<Node, unknown> = {
    kind: 'stack', elements: [
      {
        kind: 'layer',
        elements: [{name: "group 1", kind: 'group', elements: [{kind: "node", name: "element"}, {kind: "node", name: "element"}, {kind: "node", name: "element"}]}]
      },
      {
        kind: 'layer',
        elements: [{name: "group 2", kind: 'group', elements: [{kind: "node", name: "element"}, {kind: "node", name: "element"}]}]
      }
    ]
  };
  expect(width(elements))
      .toBe(ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + HORIZONTAL_SPACING + ELEMENT_WIDTH + GROUP_MARGIN_SIDE * 2)
});