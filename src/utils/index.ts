import { IFile } from "../interfaces";

export const doesFileExists = (fileTree:IFile[] ,file:IFile)=> {
 return fileTree.some((item)=> item.id === file.id)
}