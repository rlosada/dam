
/*------------------------------------------------------------------*
 * logger.ts														*
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
export function logError(f : string, msg : string)
{
    logger(f, msg, CONSOLE_COLOR.RED, CONSOLE_COLOR.RESET);
}

// Logear en color AMARILLO (WARN)
export function logWarn(f : string, msg : string)
{
    logger(f, msg, CONSOLE_COLOR.YELLOW, CONSOLE_COLOR.RESET);
}

// Logear en color VERDE (INFO)
export function logInfo(f : string, msg : string)
{
    logger(f, msg, CONSOLE_COLOR.GREEN, CONSOLE_COLOR.RESET);
}

// Logear en color BLANCO (DEBUG)
export function logDebug(f : string, msg : string)
{
    logger(f, msg, CONSOLE_COLOR.RESET, '');
}

// ==================== INTERNO ==================== 

 /*------------------------------------------------------------------*
 * logger(f, msg, being, end)									    *
 *																	*
 * Entrada:		f           Nombre de la funcion                    *
 *              msg         Mensaje                                 *
 *              begin       Color para aplicar antes de escribir en *
 *                          la consola.                             *
 *              end         Color par aplicar luego de escribie en  *
 *                          la consola.                             *
 *																	*
 * Salida:		No posee                                            *
 *																	*
 * Retorno:	    No posee                                            *
 *																	*
 * Descripcion:														*
 *																	*
 * Imprime un mensaje en la consola utilizando un formateo especial *
 *------------------------------------------------------------------*/

 function logger(f : string, msg : string, begin : string, end : string)
 {
    let max_size = 25;
    let m = `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')} | ${f + ' '.repeat(max_size - f.length)} | `
    let n = m.length;
    for(let i = 0; i < max_size - n; i++) 
        m = `${m} `;
    m = `${m} ${msg}`;
    console.log(begin + m + end);
 }

 