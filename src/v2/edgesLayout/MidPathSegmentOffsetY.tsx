import {and, ascending, descending} from "../../v1/sorting";
import {Edge, Graph} from "../newGraphModel";
import {OffsetElementsY} from "../elementsLayout/OffsetElementsY";
import {OffsetElementsX} from "../elementsLayout/OffsetElementsX";
import {getLowerRightNode, getUpperLeftNode} from "../EdgeHelper";

export type MidPathSegmentOffsetY = {
    midPathSegmentOffsetY: number
}

export type EdgeIndex = {
    edgeIndex: number
}

export function addMidPathSegmentOffsetYG<N extends OffsetElementsY & OffsetElementsX, E>(graph: Graph<N, E>):
    Graph<N, E & MidPathSegmentOffsetY & EdgeIndex> {
    addMidPathSegmentOffsetY(graph.edges);
    return graph as unknown as Graph<N, E & MidPathSegmentOffsetY & EdgeIndex>;
}

export function addMidPathSegmentOffsetY(edges: Edge<OffsetElementsY & OffsetElementsX, unknown>[]) {
    let groupedByOffsetElementsY = new Map<number, (Edge<OffsetElementsY & OffsetElementsX, EdgeIndex>)[]>();

    edges
        .map((edge, index) => {
            return Object.assign<Edge<OffsetElementsY & OffsetElementsX, unknown>, EdgeIndex>(
                edge, {edgeIndex: index});
        })
        .forEach(edge => {
            let key = getUpperLeftNode(edge).offsetElementsY;
            let edges = groupedByOffsetElementsY.get(key) || [];
            edges.push(edge);
            groupedByOffsetElementsY.set(key, edges);
        });

    Array.from(groupedByOffsetElementsY.values()).forEach(addMidPathSegmentOffsetYForLayer);
}

function addMidPathSegmentOffsetYForLayer(edges: Edge<OffsetElementsY & OffsetElementsX, EdgeIndex>[]) {
    let groupedByUpperNode = new Map<string, Edge<OffsetElementsY & OffsetElementsX, EdgeIndex>[]>();

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
        let otherLayerBefore = otherLayer.filter(edge => getLowerRightNode(edge).offsetElementsX <= getUpperLeftNode(edge).offsetElementsX);
        let otherLayerAfter = otherLayer.filter(edge => getLowerRightNode(edge).offsetElementsX > getUpperLeftNode(edge).offsetElementsX);

        sameLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), descending(edge => edge.edgeIndex)));
        otherLayerBefore.sort(and(ascending(edge => getLowerRightNode(edge).offsetElementsX), descending(edge => edge.edgeIndex)));
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