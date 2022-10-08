
import { fromFileUrl , dirname } 
from 'https://deno.land/std@0.159.0/path/mod.ts';

import { ensureDir , emptyDir , walk }
from 'https://deno.land/std@0.159.0/fs/mod.ts'

export { join }
from 'https://deno.land/std@0.159.0/path/mod.ts';


export function folder ( meta ){
    return dirname(fromFileUrl(meta.url));
}


export async function prepare ({ empty , path }){
    
    const action = (empty)
        ? emptyDir
        : ensureDir ;
        
    await action(path);
}


export async function discover ({ extension , subfolders , path }){

    const paths = [];

    const options = {
        maxDepth : subfolders ? Math.Infinity : 1 ,
        includeDirs : false ,
        includeFiles : true ,
        followSymlinks : false ,
        exts : [ extension ]
    }

    for await (const entry of walk(path,options))
        paths.push(entry.path);

    return paths;
}
