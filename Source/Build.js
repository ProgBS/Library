
import Project from './Project.js';
import * as Pretty from './Pretty.js';
import GCC from './GCC.js';
import * as Graphics from './Graphics.js';
import { discover } from './Files.js';
import { Files , Path } from './Imports.js';

const { emptyDir } = Files;
const { join } = Path;


export default async (projectDirectory,buildScript) => {

    const project = new Project(projectDirectory);


    async function discoverFiles(options = {}){

        let { folder = '' } = options;

        const path = join(project.folder,folder);

        const { subfolders , extension } = options;

        return await discover(path,{
            recursive : subfolders ,
            extension : extension
        });
    }

    async function gcc(options = {}){

        const buildFolder = join(project.folder,options.buildFolder ?? '');

        await GCC({ ... options , buildFolder });
    }



    async function remove(path){
        await Deno.remove(path).catch(() => {});
    }

    async function prepareDir(path){
        return emptyDir(join(project.folder,path));
    }


    function header(...args){
        Graphics.header(project,...args);
    }

    function spacer(...args){
        Graphics.spacer(project,...args);
    }

    function separator(...args){
        Graphics.separator(project,...args);
    }





    await buildScript({

        prettyPath : Pretty.path ,

        discoverFiles ,
        gcc ,
        remove ,
        prepareDir ,
        header ,
        spacer ,
        separator ,

        useBackground : (color) =>
            project.background = color ,

        useSpacer : (char) =>
            project.spacer = char ,

        cwd : () =>
            project.folder ,

        log : (...args) =>
            project.log(...args)
    });
}
