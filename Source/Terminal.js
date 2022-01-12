
export function size(){
    return Deno.consoleSize();
}

export function width(){
    return size().columns;
}

export function height(){
    return size().rows;
}
