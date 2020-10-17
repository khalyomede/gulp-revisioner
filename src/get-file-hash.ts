import { createHash } from "crypto";

/**
 * Returns the md5 hash corresponding to the file content.
 *
 * @param {String} fileContent The content of the file that is being revisioned.
 */
export default (fileContent: string): string => createHash("md5").update(fileContent).digest("hex");
