import IOptions from "./IOptions";
import isBoolean from "./is-boolean";
import isObject from "./is-object";
import isString from "./is-string";

/**
 * Parse the options, and fill the default values. If there is error, the error is returned instead.
 *
 * @return {Object|Error}
 */
export default (options: IOptions): IOptions|Error => {
    const parsedOptions = options;

    if (!isObject(options)) {
        return new TypeError("Expected options to be an Object.");
    }

    if ("baseUrl" in options) {
        if (!isString(options.baseUrl)) {
            return new TypeError("Expected options.baseUrl to be a String.");
        }
    } else {
        parsedOptions.baseUrl = "/";
    }

    if ("manifestDirectory" in options) {
        if (!isString(options.manifestDirectory)) {
            return new TypeError("Expected options.manifestDirectory to be a String.");
        }
    } else {
        parsedOptions.manifestDirectory = __dirname;
    }

    if ("manifestName" in options) {
        if (!isString(options.manifestName)) {
            return new TypeError("Expected options.manifestName to be a String.");
        }
    } else {
        parsedOptions.manifestName = "manifest.json";
    }

    if ("eraseBeforeWriting" in options) {
        if (!isBoolean(options.eraseBeforeWriting)) {
            return new TypeError("Expected options.eraseBeforeWriting to be a Boolean.");
        }
    } else {
        parsedOptions.eraseBeforeWriting = false;
    }

    return parsedOptions;
};
