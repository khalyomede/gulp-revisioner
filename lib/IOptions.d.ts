/**
 * The options being passed to this plugin.
 */
export default interface IOptions {
    /**
     * The base URL to prepend to every path of file. Default: "/"
     */
    baseUrl?: string;
    /**
     * The directory where to store the manifest file. Default: the directory where this plugin is called..
     */
    manifestDirectory?: string;
    /**
     * The name of the assets file. Default: assets.json
     */
    manifestName?: string;
    /**
     * Override the existing manifest without trying to keep the old content.
     */
    eraseBeforeWriting?: boolean;
    /**
     * Number of spaces to use to indent the JSON content. Default: 2.
     */
    indentSize?: number;
}
