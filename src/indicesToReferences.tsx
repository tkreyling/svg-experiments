import {Edge, Stack} from "./graphModel";

export type IndexPair = {
    from: number[]
    to: number[]
}

function indexToReference<N, G>(stack: Stack<N, G>, index: number[]): any {
    // It is necessary to go through the array by index,
    // because the array operations `every`, `map` and `flat` bypass empty array elements.
    for (let i = 0; i < index.length; i++) {
        if (index[i] === undefined) throw new Error("Empty array elements are not allowed.");
    }

    let element: any = stack;
    index.forEach(i => {
        if (element.elements[i] === undefined)
            throw new Error("Indices must refer to a node that does exist. Index " + i  + " Array length " + element.elements.length);
        element = element.elements[i];
    });
    return element;
}

function indexPairToReference<N, G>(stack: Stack<N, G>, indexPair: IndexPair): Edge<N> {
    return {
        from: indexToReference(stack, indexPair.from),
        to: indexToReference(stack, indexPair.to)
    };
}

export function indicesToReferences<N, G>(stack: Stack<N, G>, indexPairs: IndexPair[]): Edge<N>[] {
    return indexPairs.map(indexPair => indexPairToReference(stack, indexPair));
}