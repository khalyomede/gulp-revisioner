import {join} from "path";

/**
 * Return the file, and prepend the base URL.
 * Eventually converts the "\" to "/" to prevent Windows path being used.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {String} baseUrl The base URL to use to prepend in the revisioned file path.
 */
export default (filePath: string, baseUrl: string): string => join(baseUrl, filePath).replace(/\\/g, "/");
