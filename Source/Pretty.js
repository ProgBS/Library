
import { Colors ,} from './Imports.js';

const { green , dim , blue } = Colors;

const prettyPath = {
    folderColor : green,
    separator : dim(blue('/'))
};


export function path(path,options = prettyPath){

    if(path.startsWith('file:'))
        path = path.slice(7);

    const { folderColor , separator } = options;

    return path
        .split('/')
        .map((folder) => folderColor(folder))
        .join(separator);
}
