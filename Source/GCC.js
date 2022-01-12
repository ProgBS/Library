
import { Files , Path } from './Imports.js';

const { run , writeFile , remove } = Deno;
const { join , dirname } = Path;
const { ensureDir } = Files;


export default async function gcc(options = {}){

    const { buildFolder } = options;

    const GCC = join(buildFolder,'GCC.sh');

    const encoder = new TextEncoder();
    const data = encoder.encode(`g++ $@`);
    await writeFile(GCC,data,{ create : true , mode: 0o777 });

    const parameters = [
        './GCC.sh' ,
        '-std=c++20' ,
        '-fmodules-ts'
    ];

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

    const { executable } = options;

    if(executable)
        parameters.push(`-o${ join(buildFolder,executable) }`);

    let { modules , main } = options;

    if(modules && main){
        parameters.push(...[...modules.filter(file => !file.endsWith(main)),modules.find((file) => file.endsWith(main))]);
    }


    await ensureDir(dirname(executable));


    const process = await run({
        cmd : parameters ,
        cwd : buildFolder ,
        stdout : 'piped' ,
        stderr : 'piped'
    });

    const status = await process.status();

    // console.log(new TextDecoder().decode(await process.output()));
    console.error(new TextDecoder().decode(await process.stderrOutput()));

    await remove(GCC);
}
