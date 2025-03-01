import { extensionIconPaths } from "../constant";
import IconImg from "./IconImg";
import FileIcon from "./SVG/File";

interface IProp {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProp) => {
  const extenion = filename.split(".").pop();

  if (
    extenion &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extenion)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extenion]}-open.svg`
        : `${extensionIconPaths[extenion]}.svg`
      : `${extensionIconPaths[extenion]}.svg`;

    return <IconImg scr={iconPath} />;
  }

  // After Refactor
  //   if (extenion === "tsx") return <IconImg scr="/icons/react_ts.svg" />;
  //   if (extenion === "jsx") return <IconImg scr="/icons/react.svg" />;
  //   if (extenion === "js") return <IconImg scr="/icons/javascript.svg" />;
  //   if (extenion === "html") return <IconImg scr="/icons/html.svg" />;
  //   if (extenion === "node_modules" && isFolder)
  //     return isOpen ? (
  //       <IconImg scr="/icons/folder-node-open.svg" />
  //     ) : (
  //       <IconImg scr="/icons/folder-node.svg" />
  //     );
  //   if (extenion === "public" && isFolder)
  //     return isOpen ? (
  //       <IconImg scr="/icons/folder-public-open.svg" />
  //     ) : (
  //       <IconImg scr="/icons/folder-public.svg" />
  //     );
  //   if (extenion === "src" && isFolder)
  //     return isOpen ? (
  //       <IconImg scr="/icons/folder-src-open.svg" />
  //     ) : (
  //       <IconImg scr="/icons/folder-src.svg" />
  //     );

  if (isFolder)
    return isOpen ? (
      <IconImg scr="/icons/folder-default-open.svg" />
    ) : (
      <IconImg scr="/icons/folder-default.svg" />
    );
  return <FileIcon />;
};

export default RenderFileIcon;
