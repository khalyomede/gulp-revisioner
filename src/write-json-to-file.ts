import { writeFileSync } from "fs";
import IJson from "./IJson";

/**
 * Write a json object as a string to the file.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {Object} json The JSON object that represents the revisioned paths.
 */
export default (filePath: string, json: IJson): void => writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
