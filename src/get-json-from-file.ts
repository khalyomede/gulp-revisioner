import { readFileSync } from "fs";
import IJson from "./IJson";

/**
 * Returns the decoded JSON object from a file containing JSON.
 *
 * @param {String} filePath The path to the file being reivisioned.
 */
export default (filePath: string): IJson => JSON.parse(readFileSync(filePath).toString());
