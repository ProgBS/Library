
import { dirname , join } 
from 'https://deno.land/std@0.159.0/path/mod.ts';

import { ensureDir }
from 'https://deno.land/std@0.159.0/fs/mod.ts'


const { run , writeFile , remove } = Deno;


export async function gcc ( options = {} ){

    const { paths , names } = options;

    const GCC = join(paths.build,'GCC.sh');

    const encoder = new TextEncoder();
    const data = encoder.encode(`g++ $@`);
    await writeFile(GCC,data,{ create : true , mode: 0o777 });

    const parameters = [
        './GCC.sh' ,
        '-std=c++20' ,
        '-fmodules-ts'
    ]


    const { verbose } = options;

    if(verbose)
        parameters.push(`-v`);


    const { language } = options;

    if(language)
        parameters.push(`-x ${ language }`);


    const { compileObject } = options;

    if(compileObject)
        parameters.push('-c');


    const { compileAssembly } = options;

    if(compileAssembly)
        parameters.push('-S');


    const { onlyPreprocess } = options;

    if(onlyPreprocess)
        parameters.push('-E');


    const { other } = options;

    if(other)
        parameters.push(...other);


    const { executable } = names;

    if(executable)
        parameters.push(`-o${ join(paths.build,executable) }`);

    const { input } = paths;
    const { main } = names;

    if(input && main){
        parameters.push(...[...input.filter(file => !file.endsWith(main)),input.find((file) => file.endsWith(main))]);
    }


    await ensureDir(dirname(executable));


    const process = await run({
        cmd : parameters ,
        cwd : paths.build ,
        stdout : 'piped' ,
        stderr : 'piped'
    });

    const status = await process.status();

    // console.log(new TextDecoder().decode(await process.output()));
    console.error(new TextDecoder().decode(await process.stderrOutput()));

    await remove(GCC);
}
