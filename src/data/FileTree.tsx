import { IFile } from "../interfaces";
import { v4 as uuid } from "uuid";
export const fileTree: IFile = {
  id: uuid(),
  name: "vscode-Clone",
  isFolder: true,
  children: [
    {
      id: uuid(),
      name: "node_modules",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: ".vite",
          isFolder: true,
          children: [{ id: uuid(), name: "react.js", isFolder: false }],
        },
      ],
    },
    {
      id: uuid(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "index.html",
          isFolder: false,
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
        },
      ],
    },
    {
      id: uuid(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuid(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuid(),
              name: "Button.tsx",
              isFolder: false,
              content: `interface IProps {

}

const Button = ({}: IProps) => {
  return (
    <button>Click me!</button>
  )
}

export default Button`,
            },
            {
              id: uuid(),
              name: "RecursiveComponent.jsx",
              isFolder: false,
              content: `import { useState } from "react";
import { IFile } from "../interfaces";
import FileIcon from "./SVG/File";
import FolderIcon from "./SVG/Folder";
import RightArrowIcon from "./SVG/RightArrowIcon";
import BottomArrowIcon from "./SVG/BottomArrowIcon";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  setClickedFileAction,
  setOpenedFilesAction,
} from "../app/features/fileTree/FileTreeSlice";
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
      <div className="flex items-center mb-1">
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
`,
            },
          ],
        },
      ],
    },
  ],
};
