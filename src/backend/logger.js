
/*------------------------------------------------------------------*
 * logger.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa logger                                                *
 *------------------------------------------------------------------*/

 const CONSOLE_COLOR = {
    RESET   : "\x1b[0m",
    RED     : "\x1b[31m",
    GREEN   : "\x1b[32m",
    YELLOW  : "\x1b[33m",
    BLUE    : "\x1b[34m",
    MAGENTA : "\x1b[35m",
    CYAN    : "\x1b[36m"
 }

// ==================== API ==================== 
 
// Logear en color ROJO (ERROR)
function Error(f , msg)
{
    logger(f, msg, CONSOLE_COLOR.RED, CONSOLE_COLOR.RESET);
}

// Logear en color AMARILLO (WARN)
function Warn(f, msg)
{
    logger(f, msg, CONSOLE_COLOR.YELLOW, CONSOLE_COLOR.RESET);
}

// Logear en color VERDE (INFO)
function Info(f, msg)
{
    logger(f, msg, CONSOLE_COLOR.GREEN, CONSOLE_COLOR.RESET);
}

// Logear en color BLANCO (DEBUG)
function Debug(f , msg)
{
    logger(f, msg, CONSOLE_COLOR.RESET, '');
}

function drawProgressBarGreen(max_size, character, fullPercentage) 
{
    process.stdout.write('\r');
    process.stdout.write(CONSOLE_COLOR.GREEN);
    process.stdout.write('\r');
    process.stdout.write(drawProgressBar(max_size, character, fullPercentage));
    if(fullPercentage >= 100)
        process.stdout.write('\n');
}

// ==================== INTERNO ==================== 

 /*------------------------------------------------------------------*
 * logger(f, msg)									                *
 *																	*
 * Entrada:		f           Nombre de la funcion                    *
 *              msg         Mensaje                                 *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Imprime un mensaje en la consola utilizando un formateo especial *
 *------------------------------------------------------------------*/

 function logger(f, msg, begin, end)
 {
    let max_size = 32;
    let m = `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} | ${f + ' '.repeat(max_size - f.length)} | `
    let n = m.length;
    for(let i = 0; i < max_size - n; i++) 
        m = `${m} `;
    m = `${m} ${msg}`;
    console.log(begin + m + end);
 }

 function drawProgressBar(max_size, character, fullPercentage) 
{
    let bar;
    let c;
    let size;

    c    = character.slice(0,1)
    size = Math.floor(max_size * fullPercentage / 100);

    if(fullPercentage < 0 || fullPercentage > 100)
        fullPercentage = 0;
    
    bar = '[';
    for(let i = 0 ; i < size; i++)
        bar += `${c}`;
    for(let i = 0 ; i < max_size - size; i++)
        bar += ' ';    
        bar += `] ${Math.floor(fullPercentage)}%`;

    return bar;
}

module.exports = {
    Error : Error,
    Warn : Warn,
    Info : Info,
    Debug : Debug
}