
import { width } from './Terminal.js';



const { floor , ceil } = Math;


const content = (text) => text
    .replace(/\033\[[0-9;]*m/g,'');

const contentWidth = (text) =>
    content(text).length;



export function spacer(project,lines){
    project.log('\n'.repeat(lines - 1));
}


export function separator(project,symbol = ' '){

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

    project.log(line);
}

export function header(project,symbol = ' ',text = ''){

    const
        textWidth = contentWidth(text),
        symbolWidth = contentWidth(symbol);

    let padding = width();
    padding -= textWidth;
    padding -= 2 * symbolWidth;
    padding *= 0.5;

    const header =
        symbol +
        project.spacer.repeat(floor(padding)) + text +
        project.spacer.repeat(ceil(padding)) + symbol;

    separator(project,symbol);
    project.log(header);
    separator(project,symbol);
}
