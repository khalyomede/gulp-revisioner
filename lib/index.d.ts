import { Transform } from "stream";
import IOptions from "./IOptions";
declare const _default: (options?: IOptions) => Transform;
/**
 * Write file path with cache busting query strings into a JSON manifest file.
 *
 * @param {Object} options The options to configure the behavior of this plugin.
 * @param {String} options.baseUrl="/" The base URL to prepend to the files path.
 * @param {String} options.manifestDirectory=__dirname The directory to store the manifest on (default on the current directory).
 * @param {String} options.manifestName="manifest.json" The name of the manifest file.
 */
export default _default;
