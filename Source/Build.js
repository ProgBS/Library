
import { Colors , Files , Path } from './Imports.js';
const { join , extname , relative , dirname , resolve , fromFileUrl } = Path;

const { floor , ceil } = Math;
const { readDir , run } = Deno;

const { expandGlob , emptyDir , ensureDir } = Files;

const { log } = console;



const size = () => Deno
    .consoleSize();

const width = () =>
    size().columns;

const height = () =>
    size().rows;

const content = (text) => text
    .replace(/\033\[[0-9;]*m/g,'');

const contentWidth = (text) =>
    content(text).length;


export default async (cwd,setup) => {

    if(cwd instanceof URL || cwd.startsWith('file:'))
        cwd = fromFileUrl(cwd);

    if(cwd.startsWith('file:'))
        cwd = cwd.slice(7);

    const fileInfo = await Deno.stat(cwd);

    if(fileInfo.isFile)
        cwd = dirname(cwd);


    const resetColor = (text) => text;

    let background = resetColor;
    let spacer = ' ';

    function log(text){
        console.log(background(text));
    }

    async function discoverFiles(options = {}){

        let { folder = '' } = options;

        const path = join(cwd,folder);

        const { subfolders , extension } = options;

        return findFilesIn(path,{
            recursive : subfolders ,
            extension : extension
        });
    }

    async function findFilesIn(path,options){

        const files = [];

        try {

            for await (const dir of readDir(path)){

                const { name , isFile , isDirectory } = dir;

                const filepath = join(path,name);

                switch(true){
                case isFile:
                    if(name.endsWith(options.extension))
                        files.push(filepath);
                    continue;
                case isDirectory:
                    files.push(... await findFilesIn(filepath,options));
                    continue;
                }
            }
        } catch (e) {
            console.error(e);
        }

        return files;
    }

    const separator = (symbol = ' ') => {

        const symbolWidth = contentWidth(symbol);

        if(symbolWidth < 1)
            symbol = ' '

        const
            columns = width(),
            number = columns / symbolWidth;

        let line = symbol.repeat(floor(number));

        const lineWidth = contentWidth(line);

        if(lineWidth < columns)
            line += symbol.substring(0,columns - lineWidth);

        log(line);
    }

    const header = (symbol = ' ',text = '') => {

        const
            textWidth = contentWidth(text),
            symbolWidth = contentWidth(symbol);

        let padding = width();
        padding -= textWidth;
        padding -= 2 * symbolWidth;
        padding *= 0.5;

        const header =
            symbol +
            spacer.repeat(floor(padding)) + text +
            spacer.repeat(ceil(padding)) + symbol;

        separator(symbol);
        log(header);
        separator(symbol);
    }

    const useBackground = (color) =>
        background = color ?? resetColor;

    const useSpacer = (char) =>
        spacer = char;

    function prettyPath(path,options = {
        folderColor : Colors.green,
        separator : Colors.dim(Colors.blue('/'))
    }){
        const { folderColor , separator } = options;

        if(path.startsWith('file:'))
            path = path.slice(7);

        const folders = path.split('/');

        return folders
            .map((folder) => folderColor(folder))
            .join(separator);
    }

    const prepareDir = async (path) => {
        return emptyDir(join(cwd,path));
    }

    const sliceExtension = (path = '') => {
        return path.slice(0,- extname(path).length)
    }

    const switchExtension = (path = '',extension = '') => {
        return `${ sliceExtension(path) }.${ extension }`;
    }

    const switchRoot = (path = '',from = '',to = '') => {
        return resolve(join(cwd,to),relative(join(cwd,from),path));
    }

    const gcc = async (options = {}) => {

        let { buildFolder = '' } = options;

        buildFolder = join(cwd,buildFolder);

        const GCC = join(buildFolder,'GCC.sh');

        const encoder = new TextEncoder();
        const data = encoder.encode(`g++ $@`);
        await Deno.writeFile(GCC,data,{ create : true , mode: 0o777 });

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

        await Deno.remove(GCC);
    }

    await setup({
        discoverFiles,
        useBackground,
        separator,
        header,
        useSpacer,
        cwd: () => cwd,
        log,
        spacer : (lines) => log('\n'.repeat(lines - 1)),
        prettyPath,
        prepareDir,
        switchRoot,
        switchExtension,
        gcc,
        remove : async (path) => await Deno.remove(path).catch(() => {})
    });
}
