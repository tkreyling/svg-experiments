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