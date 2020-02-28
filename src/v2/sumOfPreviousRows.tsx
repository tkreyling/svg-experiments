import {ascending} from "../v1/sorting";

export function sumOfPreviousRows(max: Map<number, number>): Map<number, number> {
    let result = new Map<number, number>();

    let sumOfPrevious = 0;
    Array.from(max.entries()).sort(ascending(entry => entry[0])).forEach(entry => {
        result.set(entry[0], sumOfPrevious);
        sumOfPrevious += entry[1];
    });

    return result;
}

export function sumOfPreviousRowsFillLayers(max: Map<number, number>, maxOffsetY: number): Map<number, number> {
    let result = new Map<number, number>();

    let sumOfPrevious = 0;
    Array.from(Array(maxOffsetY + 1).keys()).forEach(layer => {
        result.set(layer, sumOfPrevious);
        sumOfPrevious += max.get(layer) || 0;
    });

    return result;
}