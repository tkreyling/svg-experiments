import {and, ascending, descending} from "../../v1/sorting";
import {Edge, Graph} from "../newGraphModel";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {getLowerRightNode, getUpperLeftNode} from "../EdgeHelper";
import {
    ConnectionIndex,
    getLowerRightNodeIndex,
    getUpperLeftNodeIndex,
    NumberOfEdges
} from "./ConnectionIndexAndNumberOfEdges";
import {EdgeIndex} from "./EdgeIndex";
import {IsLowerLayerEdge, isMultiLayerEdge} from "./SyntheticNodesAndEdges";

export type MidPathSegmentOffsetY = {
    midPathSegmentOffsetY: number
}

export function addMidPathSegmentOffsetYG<N extends OffsetElementsY & OffsetElementsX & NumberOfEdges, E extends ConnectionIndex & EdgeIndex>(graph: Graph<N, E>):
    Graph<N, E & MidPathSegmentOffsetY> {
    addMidPathSegmentOffsetY(graph.edges.concat(graph.syntheticEdges));
    return graph as unknown as Graph<N, E & MidPathSegmentOffsetY>;
}

export function addMidPathSegmentOffsetY(edges: Edge<OffsetElementsY & OffsetElementsX & NumberOfEdges, ConnectionIndex & EdgeIndex>[]) {
    let groupedByOffsetElementsY = new Map<number, (Edge<OffsetElementsY & OffsetElementsX & NumberOfEdges, ConnectionIndex & EdgeIndex>)[]>();

    edges.forEach(edge => {
        let key = getUpperLeftNode(edge).offsetElementsY;
        let edges = groupedByOffsetElementsY.get(key) || [];
        edges.push(edge);
        groupedByOffsetElementsY.set(key, edges);
    });

    Array.from(groupedByOffsetElementsY.values()).forEach(addMidPathSegmentOffsetYForLayer);
}

function addMidPathSegmentOffsetYForLayer(edges: Edge<OffsetElementsY & OffsetElementsX & NumberOfEdges, EdgeIndex & ConnectionIndex>[]) {
    let groupedByUpperNode = new Map<string, Edge<OffsetElementsY & OffsetElementsX & NumberOfEdges, EdgeIndex & ConnectionIndex>[]>();

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

        let sameLayer = edges.filter(edge => getLowerRightNode(edge).offsetElementsY === getUpperLeftNode(edge).offsetElementsY);
        let sameLayerBefore = sameLayer.filter(edge => getLowerRightNode(edge).offsetElementsX <= getUpperLeftNode(edge).offsetElementsX);
        let sameLayerAfter = sameLayer.filter(edge => getLowerRightNode(edge).offsetElementsX > getUpperLeftNode(edge).offsetElementsX);
        let otherLayer = edges.filter(edge => getLowerRightNode(edge).offsetElementsY !== getUpperLeftNode(edge).offsetElementsY);
        let otherLayerBefore = otherLayer.filter(edge => {
            if (getLowerRightNode(edge).offsetElementsX === getUpperLeftNode(edge).offsetElementsX) {
                if (isMultiLayerEdge(edge)) return false;
                if ((edge as unknown as IsLowerLayerEdge).isLowerLayerEdge) return false;

                return getLowerRightNodeIndex(edge) - ((getLowerRightNode(edge).upperSideEdges || 1) - 1) / 2 <
                    getUpperLeftNodeIndex(edge) - ((getUpperLeftNode(edge).lowerSideEdges || 1) - 1) / 2;
            }
            return getLowerRightNode(edge).offsetElementsX <= getUpperLeftNode(edge).offsetElementsX
        });
        let otherLayerAfter = otherLayer.filter(edge => {
            if (getLowerRightNode(edge).offsetElementsX === getUpperLeftNode(edge).offsetElementsX) {
                if (isMultiLayerEdge(edge)) return true;
                if ((edge as unknown as IsLowerLayerEdge).isLowerLayerEdge) return true;

                return getLowerRightNodeIndex(edge) - ((getLowerRightNode(edge).upperSideEdges || 1) - 1) / 2 >=
                    getUpperLeftNodeIndex(edge) - ((getUpperLeftNode(edge).lowerSideEdges || 1) - 1) / 2;
            }
            return getLowerRightNode(edge).offsetElementsX > getUpperLeftNode(edge).offsetElementsX
        });

        sameLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), descending(edge => edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), ascending(edge => edge.edgeIndex)));
        otherLayerAfter.sort(and(descending(edge => getLowerRightNode(edge).offsetElementsX), descending(edge => edge.edgeIndex)));
        sameLayerAfter.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), descending(edge => edge.edgeIndex)));

        let before = sameLayerBefore.concat(otherLayerBefore);
        let after = sameLayerAfter.concat(otherLayerAfter);

        function addLayerPosition(edge: Edge<OffsetElementsY & OffsetElementsX, unknown>, indexInArray: number, beforeOrAfter: "A" | "B") {
            let index = indexOffset + indexInArray;
            Object.assign<Edge<OffsetElementsY & OffsetElementsX, unknown>, MidPathSegmentOffsetY>(edge, {
                midPathSegmentOffsetY: index
            });
        }

        before.forEach((edge, index) => addLayerPosition(edge, index, "B"));
        after.forEach((edge, index) => addLayerPosition(edge, index, "A"));

        indexOffset += Math.max(before.length, after.length);
    });
}