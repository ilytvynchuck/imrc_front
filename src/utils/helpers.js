/**
 * Check if the input value is undefined or null
 *
 * @param input
 * @return {boolean}
 */
export const isUndefinedOrNull = input => input === undefined || input === null;

/**
 * Check if the input value is an empty string
 *
 * @param input
 * @return {boolean}
 */
export const isEmptyString = input => typeof input === "string" && input.length === 0;

/**
 * @param array
 * @param depth
 * @return {any[]}
 */
export const flatten = (array, depth = 1) => {
    return repeat(depth, () => {
        array = [].concat.apply([], array);

        return array;
    });
};

/**
 * Repeat given callback x times also
 * passing to callback current
 * iteration number
 *
 * @param times
 * @param fn
 * @returns {any[]}
 */
export const repeat = (times, fn) =>
    Array.from({ length: times }, (v, i) => i)
        .map(x => fn(x))
        .slice(-1)[0];

/**
 * @param array
 * @param path
 * @return {*}
 */
export const arrayPluck = (array, path) =>
    array.map(x => getObjectDot(path, x));


/**
 * Get object property
 *
 * @param path
 * @param object
 * @param defaultValue
 * @return {*}
 */
export const getObjectDot = (path, object, defaultValue = null) => {
    path.split(".").every(segment => {
        object = object[segment];
        return object;
    });
    return object || defaultValue;
};

export const toGermanNumberFormat = (number, part) => {
    return number.toFixed(part)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

