import { join } from "path";

/**
 * Return the base URL to prepend to the file paths.
 * For example, if the base url is "css", the base url will be "/css".
 *
 * @param {String} baseUrl The base URL to prepend to each file paths written in the manifest file.
 */
export default (baseUrl: string): string => join("/", baseUrl);
