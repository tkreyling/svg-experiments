export function ascending<T>(property: (obj: T) => number) {
    return (o1: T, o2: T) => property(o1) - property(o2);
}

export function descending<T>(property: (obj: T) => number) {
    return (o1: T, o2: T) => property(o2) - property(o1);
}

export function and<T>(...sortFunctions: ((o1: T, o2: T) => number)[]) {
    return (o1: T, o2: T) => {
        let i = 0;
        while (true) {
            if (i == sortFunctions.length) return 0;
            let result = sortFunctions[i](o1, o2);
            if (result != 0) return result;
            i++;
        }
    }
}