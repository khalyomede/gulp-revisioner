'use strict';

var stream = require('stream');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

/**
 * Returns true if the element is a Boolean, else returns false.
 *
 * @param {Any} element The variable to check.
 */
var isBoolean = (function (element) { return element !== null && element !== undefined && element.constructor === Boolean; });

/**
 * Returns true if the element is an Object, else returns false.
 *
 * @param {Any} element The variable to check.
 */
var isObject = (function (element) { return element !== null && element !== undefined && element.constructor === Object; });

/**
 * Returns true if the element is a String, else returns false.
 *
 * @param {Any} element The variable to check.
 */
var isString = (function (element) { return element !== null && element !== undefined && element.constructor === String; });

/**
 * Parse the options, and fill the default values. If there is error, the error is returned instead.
 *
 * @return {Object|Error}
 */
var checkOptions = (function (options) {
    var parsedOptions = options;
    if (!isObject(options)) {
        return new TypeError("Expected options to be an Object.");
    }
    if ("baseUrl" in options) {
        if (!isString(options.baseUrl)) {
            return new TypeError("Expected options.baseUrl to be a String.");
        }
    }
    else {
        parsedOptions.baseUrl = "/";
    }
    if ("manifestDirectory" in options) {
        if (!isString(options.manifestDirectory)) {
            return new TypeError("Expected options.manifestDirectory to be a String.");
        }
    }
    else {
        parsedOptions.manifestDirectory = __dirname;
    }
    if ("manifestName" in options) {
        if (!isString(options.manifestName)) {
            return new TypeError("Expected options.manifestName to be a String.");
        }
    }
    else {
        parsedOptions.manifestName = "manifest.json";
    }
    if ("eraseBeforeWriting" in options) {
        if (!isBoolean(options.eraseBeforeWriting)) {
            return new TypeError("Expected options.eraseBeforeWriting to be a Boolean.");
        }
    }
    else {
        parsedOptions.eraseBeforeWriting = false;
    }
    return parsedOptions;
});

/**
 * Return the base URL to prepend to the file paths.
 * For example, if the base url is "css", the base url will be "/css".
 *
 * @param {String} baseUrl The base URL to prepend to each file paths written in the manifest file.
 */
var getBaseUrl = (function (baseUrl) { return path.join("/", baseUrl); });

/**
 * Get the relative file path from a Buffer.
 * For example, if the Buffer contains "/home/Khalyomede/my-project/assets/sass/home.sass"
 * and the base path is "/home/khalyomede/my-project/assets/sass", so this function will return
 * "home.sass".
 *
 * @param {Object} file The file that is being revisioned.
 */
var getFilePath = (function (file) { return file.path.replace(file.base, ""); });

/**
 * Returns the decoded JSON object from a file containing JSON.
 *
 * @param {String} filePath The path to the file being reivisioned.
 */
var getJsonFromFile = (function (filePath) { return JSON.parse(fs.readFileSync(filePath).toString()); });

/**
 * Return the file, and prepend the base URL.
 * Eventually converts the "\" to "/" to prevent Windows path being used.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {String} baseUrl The base URL to use to prepend in the revisioned file path.
 */
var getRevisionKey = (function (filePath, baseUrl) { return path.join(baseUrl, filePath).replace(/\\/g, "/"); });

/**
 * Returns the md5 hash corresponding to the file content.
 *
 * @param {String} fileContent The content of the file that is being revisioned.
 */
var getFileHash = (function (fileContent) { return crypto.createHash("md5").update(fileContent).digest("hex"); });

/**
 * Get the revisioned path to the file, with a query string to use cache busting.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {String} baseUrl The base URL that is prepended to the revisioned file path.
 * @param {String} fileContent The content of the file being reivsioned.
 */
var getRevisionValue = (function (filePath, baseUrl, fileContent) {
    var hash = getFileHash(fileContent);
    return (path.join(baseUrl, filePath) + ("?id=" + hash)).replace(/\\/g, "/");
});

/**
 * Write a json object as a string to the file.
 *
 * @param {String} filePath The path to the file being revisioned.
 * @param {Object} json The JSON object that represents the revisioned paths.
 */
var writeJsonToFile = (function (filePath, json) { return fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n"); });

/**
 * Write the revisioned path to the manifest file.
 *
 * @param {Object|string} file The file being passed to this plugin.
 * @param {Object} options The options being passed to this plugin.
 */
var writeManifest = (function (file, options) {
    var _a, _b, _c;
    if (typeof file === "string") {
        return new TypeError("Expected file to be a Buffer.");
    }
    var filePath = getFilePath(file);
    var baseUrl = getBaseUrl((_a = options.baseUrl) !== null && _a !== void 0 ? _a : "");
    var revisionKey = getRevisionKey(filePath, baseUrl);
    var revisionValue = getRevisionValue(filePath, baseUrl, file.contents);
    var manifestPath = path.join((_b = options.manifestDirectory) !== null && _b !== void 0 ? _b : "", (_c = options.manifestName) !== null && _c !== void 0 ? _c : "");
    var json = !options.eraseBeforeWriting && fs.existsSync(manifestPath) ? getJsonFromFile(manifestPath) : {};
    json[revisionKey] = revisionValue;
    writeJsonToFile(manifestPath, json);
    return null;
});

/**
 * Write file path with cache busting query strings into a JSON manifest file.
 *
 * @param {Object} options The options to configure the behavior of this plugin.
 * @param {String} options.baseUrl="/" The base URL to prepend to the files path.
 * @param {String} options.manifestDirectory=__dirname The directory to store the manifest on (default on the current directory).
 * @param {String} options.manifestName="manifest.json" The name of the manifest file.
 */
var index = (function (options) {
    var parsedOptions = checkOptions(options);
    var transformStream = new stream.Transform({ objectMode: true });
    transformStream._transform = function (file, encoding, callback) {
        if (parsedOptions instanceof Error) {
            callback(parsedOptions, file);
            return;
        }
        var result = writeManifest(file, options);
        callback(result, file);
    };
    return transformStream;
});

module.exports = index;
