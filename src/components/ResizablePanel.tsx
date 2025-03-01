import { ReactNode } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface IProp {
  defaultLayout?: number[] | undefined;
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

const ResizablePanel = ({
  defaultLayout = [20, 80],
  leftPanel,
  rightPanel,
}: IProp) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup
      direction="horizontal"
      onLayout={onLayout}
      autoSaveId={"condition"}
    >
      <Panel defaultSize={defaultLayout[0]} collapsible={true}>
        {leftPanel}
      </Panel>
      <PanelResizeHandle className=" border-r-3  w-2 border-[#ffffff1f] h-screen "  />

      <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
    </PanelGroup>
  );
};

export default ResizablePanel;
