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
export type LayerIndex = {
    layerIndex: number
}
export type Index = {
    index: number
}
export type Key = {
    key: string
}
export type LayerPosition = LayerIndex & Index & Key
type Symbols = "component"
export type Node = {
    kind: 'node'
    name: string
    symbol?: Symbols
    size?: number
    isPlaceholder?: boolean
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
    elements: ((Group<N, G> & G) | Stack<N, G> | N)[]
}
export type Stack<N, G> = {
    kind: 'stack'
    elements: Layer<N, G>[]
}
export type Graph<N, E, G> = {
    stack: Stack<N, G>
    edges: (Edge<N> & E)[]
}

function fromIsUpperLeft<T extends LayerIndex & X>(edge: Edge<T>) {
    if (edge.from.layerIndex === edge.to.layerIndex) {
        return edge.from.x <= edge.to.x;
    }
    return edge.from.layerIndex < edge.to.layerIndex;
}

export function getUpperLeftNode<T extends LayerIndex & X>(edge: Edge<T>): T {
    return fromIsUpperLeft(edge) ? edge.from : edge.to;
}

export function getLowerRightNode<T extends LayerIndex & X>(edge: Edge<T>): T {
    return fromIsUpperLeft(edge) ? edge.to : edge.from;
}