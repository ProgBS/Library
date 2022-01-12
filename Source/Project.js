import { Path } from './Imports.js';

const { dirname , fromFileUrl } = Path;
const { log } = console;


const resetColor = (text) => text;


function normalize(path){

    if(path instanceof URL || path.startsWith('file:'))
        path = fromFileUrl(path);

    if(path.startsWith('file:'))
        path = path.slice(7);

    if(/\.[\S]*?$/.test(path))
        path = dirname(path);

    return path;
}


export default class Project {

    #directory

    #background = resetColor;
    #spacer = ' ';

    constructor(directory){
        this.#directory = normalize(directory);
    }


    get folder(){
        return this.#directory;
    }

    get spacer(){
        return this.#spacer;
    }

    get background(){
        return this.#background;
    }


    set background(color){
        this.#background = color ?? resetColor;
    }

    set spacer(char){
        this.#spacer = char ?? ' ';
    }


    log(text){
        log(this.#background(text));
    }
}
