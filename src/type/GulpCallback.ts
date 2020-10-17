import IFile from "../IFile";

/**
 * To provide types for the callback (third parameter of any gulp plugins).
 */
type GulpCallback = (error: Error|null, file: IFile|string) => void;

export default GulpCallback;
