
import { Path } from './Imports.js';



export async function discover(path,options){

    const files = [];

    try {

        for await (const dir of Deno.readDir(path)){

            const { name , isFile , isDirectory } = dir;

            const filepath = Path.join(path,name);

            switch(true){
            case isFile:
                if(name.endsWith(options.extension))
                    files.push(filepath);
                continue;
            case isDirectory:
                files.push(... await discover(filepath,options));
                continue;
            }
        }
    } catch (e) {
        console.error(e);
    }

    return files;
}
