import { useSelector } from "react-redux";
import FileSyntaxHighliter from "./components/FileSyntaxHighliter";
import OpenedFilesBar from "./components/OpenedFilesBar";
import { RootState } from "./app/store";

interface IProp {


}

const Preview = ({}: IProp) => {
      const {  clickedFile } = useSelector(
        (state: RootState) => state.fileTree
      );
  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighliter content={clickedFile.fileContent} />
    </>
  );
}

export default  Preview