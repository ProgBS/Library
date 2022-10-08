
import { width } from './Terminal.js';


const { floor , ceil } = Math;
const { log } = console;


const content = (text) => text
    .replace(/\033\[[0-9;]*m/g,'');

const contentWidth = (text) =>
    content(text).length;


export function print ( ... args ){
    log( ... args );
}

export function clear (){
    console.clear();
}


export function spacer(lines){
    log('\n'.repeat(lines - 1));
}


export function separator(symbol = ' '){

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

export function header({ fill = ' ' , text = '' }){

    const
        textWidth = contentWidth(text),
        symbolWidth = contentWidth(fill);

    let padding = width();
    padding -= textWidth;
    padding -= 2 * symbolWidth;
    padding *= 0.5;

    const header =
        fill +
        ' '.repeat(floor(padding)) + text +
        ' '.repeat(ceil(padding)) + fill;

    separator(fill);
    log(header);
    separator(fill);
}
