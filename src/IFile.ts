/**
 * Provides typing information for the file that is passed to this plugin.
 */
interface IFile {
    base: string;
    path: string;
    contents: string;
}

export default IFile;
