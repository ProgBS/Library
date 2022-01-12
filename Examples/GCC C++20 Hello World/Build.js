import * as Colors from 'Colors';
import Project from 'Build';


await Project(import.meta.url,async (project) => {

    const { cwd , header , log , spacer , prettyPath } = project;
    const { green , white , bold , blue } = Colors;


    header(blue('+'),blue(bold('GCC C++20 Hello World')));

    spacer();
    log(bold('Project Directory: ') + prettyPath(cwd()));
    spacer(2);


    const { discoverFiles , prepareDir , gcc } = project;


    const sources = await discoverFiles({
        subfolders : true ,
        extension : 'cpp' ,
        folder : 'Source' ,
    });

    await prepareDir('Build');

    await gcc({
        buildFolder : 'Build' ,
        executable : 'App' ,
        modules : sources ,
        verbose : false ,
        main : 'Main.cpp'
    });


    header(' ',green(bold('Build Successful')));
});
