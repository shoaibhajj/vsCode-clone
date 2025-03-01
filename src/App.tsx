import "./App.css";
import { fileTree } from "./data/FileTree";
import RecursiveComponent from "./components/RecusiveComponent";
import ResizablePanel from "./components/ResizablePanel";
import Preview from "./Preview";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import WelcomeTab from "./components/WelcomeTab";

function App() {
  // const renderFileTree = (fileTree: IFile) => {

  //    return <>
  //    {  fileTree.children && fileTree.children.map((file, idx) => {
  //       //conditional case
  //       if (!file.isFolder) return <FileComponent filename={file.name} />;

  //       return renderFileTree(file);
  //     })}
  //    </>

  // };
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  return (
    <div className="">
      <div className="flex">
        <ResizablePanel
          leftPanel={
            <div className="w-64">
              <RecursiveComponent fileTree={fileTree} />
            </div>
          }
          rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
        />
      </div>
    </div>
  );
}

export default App;
