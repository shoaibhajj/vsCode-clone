import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import { useState } from "react";
import ContextMenu from "./ui/ContextMenu";

interface IProp {}

const OpenedFilesBar = ({}: IProp) => {
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <div
        className="flex justify-start items-center border-b-2  border-[#ffffff1f]"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
          console.log(e.clientX, e.clientY);
        }}
      >
        {openedFiles.map((file) => (
          <>
            <OpenedFilesBarTab file={file} key={file.id} />
            {showMenu && (
              <ContextMenu positions={menuPosition} file={file}  setShowMenu={setShowMenu} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default OpenedFilesBar;
