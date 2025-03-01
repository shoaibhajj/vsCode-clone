import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFilesAction,
} from "../../app/features/fileTree/fileTreeSlice";
import { IFile } from "../../interfaces";
import { RootState } from "../../app/store";

interface IProp {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
  file: IFile;
}

const ContextMenu = ({ positions, setShowMenu, file }: IProp) => {
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event?.target as Node))
        setShowMenu(false);
    };
    window.addEventListener("click", handleClickOutside);

    //Every Event we should to remove it when component is destroyed
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  const closeAll = () => {
    dispatch(setOpenedFilesAction([]));
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
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-fit rounded-md px-7 py-2 "
        style={{
          position: "absolute",
          left: positions.x,
          top: positions.y,
        }}
      >
        <li
          className="text-gray-700 block px-4 text-sm cursor-pointer
          hover:bg-gray-300 duration-300 rounded-md  "
          role="menuitem"
          onClick={() => {
            onRemove(file.id);
          }}
        >
          Close{" "}
        </li>
        <li
          onClick={closeAll}
          className="text-gray-700 block px-4 text-sm cursor-pointer
          hover:bg-gray-300 duration-300 rounded-md  "
          role="menuitem"
        >
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
