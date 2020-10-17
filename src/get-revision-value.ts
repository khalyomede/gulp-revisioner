import { join } from "path";
import getFileHash from "./get-file-hash";

/**
 * Get the revisioned path to the file, with a query string to use cache busting.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {String} baseUrl The base URL that is prepended to the revisioned file path.
 * @param {String} fileContent The content of the file being reivsioned.
 */
export default (filePath: string, baseUrl: string, fileContent: string): string => {
    const hash = getFileHash(fileContent);

    return (join(baseUrl, filePath) + `?id=${hash}`).replace(/\\/g, "/");
};
