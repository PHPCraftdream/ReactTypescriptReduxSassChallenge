export const fruitMem = <T>(getObj: () => T): () => T => {
    let memArg: T | null = null;

    return (): T => {
        if (!memArg) {
            memArg = getObj();
        }

        return memArg;
    };
} ;
