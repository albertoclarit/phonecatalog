import {Connection} from "typeorm";


export async function createSingleton (name:string, create:   () => Promise<{connection:Connection}>): Promise<{connection:Connection}>{
    const s = Symbol.for(name);
    // @ts-ignore
    let scope = (global)[s];
    if (!scope) {
        let scopeValue = await create()
        scope = {...scopeValue};
        // @ts-ignore
        (global)[s] = scope;
    }
    return scope;
}



