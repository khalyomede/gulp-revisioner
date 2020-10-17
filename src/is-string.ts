/**
 * Returns true if the element is a String, else returns false.
 *
 * @param {Any} element The variable to check.
 */
export default (element: any): boolean => element !== null && element !== undefined && element.constructor === String;
