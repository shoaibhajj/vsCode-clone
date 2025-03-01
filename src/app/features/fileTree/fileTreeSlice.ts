import { IFile } from "./../../../interfaces/index";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
  activeTabId: string | null;
}
interface IInitialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
}

const initialState: IInitialState = {
  openedFiles: [],
  clickedFile: {
    activeTabId: null,
    fileName: "",
    fileContent: "",
  },
};

export const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFilesAction: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFileAction: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
  
  },
});

export const { setOpenedFilesAction, setClickedFileAction,  } =
  fileTreeSlice.actions;

export default fileTreeSlice.reducer;
