import "../css/editor.css";

import * as React from "react";

import EditorCursorOverlay from "./EditorCursorOverlay";
import EditorInput from "./EditorInput";
import EditorLineNumbers from "./EditorLineNumbers";
import EditorLines from "./EditorLines";
import EditorStore from "../model/EditorStore";
import TextWidth from "../utils/TextWidth";

export const EDITOR_WORKSPACE_ID = "editor-workspace";

const Editor = (props: {}) => {
  TextWidth.init();

  return (
    <EditorStore.Container>
      <div className="editor-root">
        <EditorLineNumbers />
        <div id={EDITOR_WORKSPACE_ID}>
          <EditorLines />
          <EditorCursorOverlay />
          <EditorInput />
        </div>
      </div>
    </EditorStore.Container>
  );
};

export default Editor;
