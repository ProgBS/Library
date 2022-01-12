
# GCC C++20 Hello World

If you installed **[Deno]** & **[GCC]**, you are good to go <br>
and can simply **[Download]** this example and <br>
execute the `Test.sh` script to try it.

---

<br>

[`Build.js`][BuildScript]

```js
import * as Colors from 'Colors';
import Project from 'Build';
```

*We define local names for our imports.*

<br>
<br>

```js
await Project(import.meta.url,async (project) => {
```

*We create a new project in which we define* <br>
*the working directory with the first argument.*

`import.meta.url` *Returns the path of the current file.*

*The `project` variable supplies all the build functions.*

<br>
<br>

```js
    const { cwd , header , log , spacer , prettyPath } = project;
    const { green , white , bold , blue } = Colors;
```

*Here we select a couple of functions to use in our build process,* <br>
*as well as terminal formatting functions for colored text.*

<br>
<br>

```js
    header(blue('+'),blue(bold('GCC C++20 Hello World')));
```

*We print a centered header with bold, blue <br>*
*text and a border consisting of blue `+` signs.*

![Title]

<br>
<br>

```js
    spacer();
    log(bold('Project Directory: ') + prettyPath(cwd()));
    spacer(2);
```

*We print the projects' working directory with padding before and afterwards.*

![Project Directory]

<br>
<br>

```js
    const { discoverFiles , prepareDir , gcc } = project;
```

*More functions we will be using.*

<br>
<br>

```js
    const sources = await discoverFiles({
        subfolders : true ,
        extension : 'cpp' ,
        folder : 'Source' ,
    });
```

*We collect all files in the `Source` folder that end with `.cpp` .* <br>
*The Source folder is relative to the* ***Project Directory*** *.*

<br>
<br>

```js
    await prepareDir('Build');
```

*The `Build` directory is created if it doesn't* <br>
*exist and emptied if it has any content.*

<br>
<br>

```js
    await gcc({
        buildFolder : 'Build' ,
        executable : 'App' ,
        modules : sources ,
        verbose : false ,
        main : 'Main.cpp'
    });
```

*We compile our source files with* ***GCC*** *, `C++20` is implied.*

*All build files are stored in the `Build` directory,* <br>
*the executable named `App` is also in this folder.*

*The `Main.cpp` is specified, to be compiled last, so<br>
all modules it depends on are built in beforehand.*

<br>
<br>

```js
    header(white(' '),green(bold('Build Successful')));
});
```

*Lastly we print a message of success.*

![Success]

---

<br>

[`Imports.json`][ImportMap]

```json
{
    "imports" : {

        "Build" : "https://raw.githubusercontent.com/Denoed/ProgB/0.1.0/Source/Build.js",

        "Colors" : "https://deno.land/std@0.120.0/fmt/colors.ts"
    }
}
```

Deno allows you to define aliases for imports.

Here we define `Build` for the version of **ProgB** <br>
we want to use, if you wan't a different version, <br>
simply adjust it in the link.

With `Colors` we simply abbreviate **Denos** <br>
implementation of `Terminal Formatting` <br>
color codes.

---

<br>

[`Test.sh`][TestScript]

```sh
#!/bin/sh

clear


# Using the path of this script we can find
# files with relative directions no matter
# from where the script is started.

dir="$(dirname "$0")/../"

importmap="$dir/Configs/Imports.json"
buildscript="$dir/Build.js"
executable="$dir/Build/App"


# Build the application

deno run                    \
--unstable              \
--allow-write           \
--allow-read            \
--allow-run             \
--importmap=$importmap  \
$buildscript


# Test the application

$executable
```

This shell script is just used for convenience: <br>
➜ *Clears the terminal* <br>
➜ *Executes the build script* <br>
➜ *Starts the compiled program*

---

<br>

`keybindings.json`

```json
{
    "command" : "workbench.action.terminal.sendSequence" ,
    "key"     : "f5" ,

    "args" : {
        "text" : "${workspaceFolder}/Configs/Test.sh\u000D"
    }
}
```

*If you use `VSCode` you can also add a shortcut for convenience.*

*1. Goto `File » Preferences » Keyboard Shortcuts`.* <br>
*2. Click on `Open Keyboard Shortcuts (JSON)` in the upper right corner.* <br>
*3.* ***Append*** *the following shortcut &* ***Adjust*** *if needed.*


<!--
    ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜
    ▌                               Link Area                               ▐
    ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟
-->

[Deno]: https://deno.land/
[GCC]: https://gcc.gnu.org/

[Download]: ../../Examples/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/
[BuildScript]: ../../Examples/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Build.js
[ImportMap]: ../../Examples/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Configs/Imports.json
[TestScript]: ../../Examples/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Configs/Test.js

[Title]: ../../Resources/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Title.png
[Project Directory]: ../../Resources/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Project%20Directory.png
[Success]: ../../Resources/GCC%E2%80%82C++20%E2%80%82Hello%E2%80%82World/Success.png
