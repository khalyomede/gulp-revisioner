import { existsSync } from "fs";
import { join } from "path";
import getBaseUrl from "./get-base-url";
import getFilePath from "./get-file-path";
import getJsonFromFile from "./get-json-from-file";
import getRevisionKey from "./get-revision-key";
import getRevisionValue from "./get-revision-value";
import IFile from "./IFile";
import IOptions from "./IOptions";
import writeJsonToFile from "./write-json-to-file";

/**
 * Write the revisioned path to the manifest file.
 *
 * @param {Object|string} file The file being passed to this plugin.
 * @param {Object} options The options being passed to this plugin.
 */
export default (file: IFile|string, options: IOptions): Error|null => {
    if (typeof file === "string") {
        return new TypeError("Expected file to be a Buffer.");
    }

    const filePath = getFilePath(file);
    const baseUrl = getBaseUrl(options.baseUrl ?? "");
    const revisionKey = getRevisionKey(filePath, baseUrl);
    const revisionValue = getRevisionValue(filePath, baseUrl, file.contents);
    const manifestPath = join(options.manifestDirectory ?? "", options.manifestName ?? "");
    const json = !options.eraseBeforeWriting && existsSync(manifestPath) ? getJsonFromFile(manifestPath) : {};

    json[revisionKey] = revisionValue;

    writeJsonToFile(manifestPath, json, options.indentSize);

    return null;
};
