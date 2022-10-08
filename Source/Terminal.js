
const { consoleSize } = Deno;


export function size(){
    return consoleSize();
}

export function width(){
    return size().columns;
}

export function height(){
    return size().rows;
}
