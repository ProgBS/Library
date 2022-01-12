

export function sliceExtension(path = ''){
    return path.slice(0,- extname(path).length)
}

export function switchExtension(path = '',extension = ''){
    return `${ sliceExtension(path) }.${ extension }`;
}

export function switchRoot(cwd,path = '',from = '',to = ''){
    return resolve(join(cwd,to),relative(join(cwd,from),path));
}
