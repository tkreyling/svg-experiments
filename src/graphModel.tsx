export type X = {
    x: number
}
export type Y = {
    y: number
}
export type Height = {
    height: number
}
export type LayerDimensions = {
    belowLayerY: number
}
export type LayerPosition = {
    key: string
    index: number
    layerIndex: number
}
export type GroupPosition = {
    key: string
    index: number
    layerIndex: number
}
type Symbols = "component"
export type Node = {
    kind: 'node'
    name: string
    symbol?: Symbols
    size?: number
}
export type Edge<T> = {
    from: T
    to: T
}
export type EdgeIndex = {
    edgeIndex: number
}
export type ConnectionIndex = {
    fromIndex: number
    toIndex: number
}
export type NumberOfEdges = {
    upperSideEdges: number
    lowerSideEdges: number
}
export type Group<N, G> = {
    kind: 'group'
    name: string
    elements: ((Group<N, G> & G) | N)[]
}
export type Layer<N, G> = {
    kind: 'layer'
    elements: (Group<N, G> & G)[]
}
export type Stack<N, G> = {
    kind: 'stack'
    elements: Layer<N, G>[]
}
export type Graph<N, E, G> = {
    stack: Stack<N, G>
    edges: (Edge<N> & E)[]
}

function fromIsUpper<T extends LayerPosition>(edge: Edge<T>) {
    if (edge.from.layerIndex === edge.to.layerIndex) {
        return edge.from.index <= edge.to.index;
    }
    return edge.from.layerIndex < edge.to.layerIndex;
}

export function getUpperNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.from : edge.to;
}

export function getLowerNode<T extends LayerPosition>(edge: Edge<T>): T {
    return fromIsUpper(edge) ? edge.to : edge.from;
}