import {Edge, Graph} from "../newGraphModel";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {LowerLayerEdge} from "./SyntheticNodesAndEdges";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {EdgeIndex} from "./EdgeIndex";
import {getLowerRightNode, getUpperLeftNode} from "../EdgeHelper";
import {and, ascending} from "../../v1/sorting";

export type CrossLayerPathSegmentOffsetX = {
    crossLayerPathSegmentOffsetX?: number
}

export type RequiredNodeDataTypes = OffsetElementsX & OffsetElementsY
export type RequiredEdgeDataTypes = EdgeIndex & LowerLayerEdge<unknown, unknown>
export type RequiredEdgeType = Edge<RequiredNodeDataTypes, RequiredEdgeDataTypes>

export function addCrossLayerPathSegmentOffsetXG<N extends RequiredNodeDataTypes, E extends RequiredEdgeDataTypes>(graph: Graph<N, E>):
    Graph<N, E & CrossLayerPathSegmentOffsetX> {
    addCrossLayerPathSegmentOffsetX(graph.edges);
    return graph as unknown as Graph<N, E & CrossLayerPathSegmentOffsetX>;
}

export function addCrossLayerPathSegmentOffsetX(edges: RequiredEdgeType[]) {
    let groupedByOffsetElementsX = new Map<number, RequiredEdgeType[]>();

    edges.filter(edge => edge.lowerLayerEdge).forEach(edge => {
        let key = getUpperLeftNode(edge).offsetElementsX;
        let edges = groupedByOffsetElementsX.get(key) || [];
        edges.push(edge);
        groupedByOffsetElementsX.set(key, edges);
    });

    Array.from(groupedByOffsetElementsX.values()).forEach(addCrossLayerPathSegmentOffsetXForSlice);
}

function addCrossLayerPathSegmentOffsetXForSlice(edges: RequiredEdgeType[]) {
    let groupedByUpperNode = new Map<string, RequiredEdgeType[]>();

    edges.forEach(edge => {
        let upperLeftNode = getUpperLeftNode(edge);
        let key = upperLeftNode.offsetElementsY + "_" + upperLeftNode.offsetElementsX;
        let edges = groupedByUpperNode.get(key) || [];
        edges.push(edge);
        groupedByUpperNode.set(key, edges);
    });

    let nodeKeys = Array.from(groupedByUpperNode.keys());
    nodeKeys.sort();

    let indexOffset = 0;
    nodeKeys.forEach(nodeKey => {
        let edges = groupedByUpperNode.get(nodeKey)!;

        edges.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), ascending(edge => edge.edgeIndex)));

        function addOffset(edge: RequiredEdgeType, indexInArray: number) {
            let index = indexOffset + indexInArray;
            Object.assign<RequiredEdgeType, CrossLayerPathSegmentOffsetX>(edge, {
                crossLayerPathSegmentOffsetX: index
            });
        }

        edges.forEach((edge, index) => addOffset(edge, index));

        indexOffset += edges.length;
    });
}