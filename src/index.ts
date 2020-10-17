import { Transform } from "stream";
import IFile from "./IFile";
import IOptions from "./IOptions";
import checkOptions from "./parse-options";
import GulpCallback from "./type/GulpCallback";
import writeManifest from "./write-manifest";

/**
 * Write file path with cache busting query strings into a JSON manifest file.
 *
 * @param {Object} options The options to configure the behavior of this plugin.
 * @param {String} options.baseUrl="/" The base URL to prepend to the files path.
 * @param {String} options.manifestDirectory=__dirname The directory to store the manifest on (default on the current directory).
 * @param {String} options.manifestName="manifest.json" The name of the manifest file.
 */
export default (options: IOptions): Transform => {
    const parsedOptions = checkOptions(options);

    const transformStream = new Transform({objectMode: true});

    transformStream._transform = (file: IFile|string, encoding: string, callback: GulpCallback) => {
        if (parsedOptions instanceof Error) {
            callback(parsedOptions, file);

            return;
        }

        const result = writeManifest(file, options);

        callback(result, file);
    };

    return transformStream;
};
