import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/RightArrowIcon";
import BottomArrowIcon from "./SVG/BottomArrowIcon";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setClickedFileAction,
  setOpenedFilesAction,
} from "../app/features/fileTree/fileTreeSlice";
import { doesFileExists } from "../utils";

interface IProp {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProp) => {
  const { isFolder, name, children } = fileTree;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);

  const onClickedFile = () => {
    const exists = doesFileExists(openedFiles, fileTree);
    dispatch(
      setClickedFileAction({
        fileName: fileTree.name,
        fileContent: fileTree.content,
        activeTabId: fileTree.id,
      })
    );
    if (exists) return;

    dispatch(setOpenedFilesAction([...openedFiles, fileTree]));
  };
  return (
    <div className="mb-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-1.5">
        {isFolder ? (
          <div className="flex items-center" onClick={toggle}>
            {isOpen ? (
              <>
                <BottomArrowIcon />
              </>
            ) : (
              <RightArrowIcon />
            )}

            <RenderFileIcon
              filename={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span className="ml-2">{name}</span>
          </div>
        ) : (
          <div className="mr-2 flex items-center " onClick={onClickedFile}>
            <RenderFileIcon filename={name} />
            <span className="ml-2   ">{name}</span>
          </div>
        )}
      </div>

      {children &&
        isOpen &&
        children.map((file, idx) => {
          //conditional case
          return <RecursiveComponent fileTree={file} key={idx} />;
        })}
    </div>
  );
};

export default RecursiveComponent;
