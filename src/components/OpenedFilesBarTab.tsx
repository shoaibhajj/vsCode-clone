import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./ui/CloseIcon";
import {
  setClickedFileAction,
  setOpenedFilesAction,
} from "../app/features/fileTree/fileTreeSlice";
import { RootState } from "../app/store";

interface IProp {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProp) => {
  const dispatch = useDispatch();
  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.fileTree);
  const onClick = () => {
    dispatch(
      setClickedFileAction({
        fileName: file.name,
        fileContent: file.content,
        activeTabId: file.id,
      })
    );
  };
  const onRemove = (selectedId: string) => {
    const filtered = openedFiles.filter((file) => file.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFilesAction([]));
      dispatch(
        setClickedFileAction({
          activeTabId: null,
          fileContent: "",
          fileName: "",
        })
      );
      return;
    }

    dispatch(setOpenedFilesAction(filtered));
    dispatch(
      setClickedFileAction({
        activeTabId: lastTab.id,
        fileContent: lastTab.content,
        fileName: lastTab.name,
      })
    );
  };
  return (
    <div
      className={`flex justify-center items-center p-2 border-t-4
      ${file.id === activeTabId ? " border-[#cf6ccf] " : "border-transparent"}
      `}
      onClick={onClick}
    >
      <RenderFileIcon filename={file.name} />

      <li className="cursor-pointer  flex justify-center items-center w-fit mx-2 p-1 rounded-md">
        {file.name}
      </li>
      <span
        className="hover:bg-[#64646473] duration-300 cursor-pointer flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
