import { writeFileSync } from "fs";
import IJson from "./IJson";

/**
 * Write a json object as a string to the file.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {Object} json The JSON object that represents the revisioned paths.
 * @param {Number} numberOfSpaces The number of spaces to use to indent the written JSON.
 */
export default (filePath: string, json: IJson, numberOfSpaces = 2): void => writeFileSync(filePath, JSON.stringify(json, null, numberOfSpaces) + "\n");
