
/**
 * 
 * @description Converts a date string in the format 'yyyyMMdd' to a Date object.
 * 
 * 
 * 
 * @param {string | number} rawDate 
 * @returns {Date | null}
 * 
 * @example dateFrom_yyyyMMdd('20210101')
 */

export function dateFrom_yyyyMMdd(rawDate: string | number) : Date | null {
    try {

        if(typeof rawDate === 'number') rawDate = rawDate.toString();
        if(rawDate.length !== 8) return null;
        
        var year = rawDate.substring(0, 4);
        var month = rawDate.substring(4, 6);
        var day = rawDate.substring(6, 8);
        var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        return date;
    } catch (error) {
        return null;
    }
}