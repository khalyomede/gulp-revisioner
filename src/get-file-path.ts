import IFile from "./IFile";

/**
 * Get the relative file path from a Buffer.
 * For example, if the Buffer contains "/home/Khalyomede/my-project/assets/sass/home.sass"
 * and the base path is "/home/khalyomede/my-project/assets/sass", so this function will return
 * "home.sass".
 *
 * @param {Object} file The file that is being revisioned.
 */
export default (file: IFile): string => file.path.replace(file.base, "");
