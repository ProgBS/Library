
import { green , dim , blue } 
from 'https://deno.land/std@0.159.0/fmt/colors.ts'


export function prettyPath ( path , options = {} ){

    const { 
        folderColor = green , 
        separator = dim(blue('/'))
    } = options;
    

    if(path.startsWith('file:'))
        path = path.slice(7);


    return path
        .split('/')
        .map((folder) => folderColor(folder))
        .join(separator);
}
