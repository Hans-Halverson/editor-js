import "../css/editor.css";

import * as React from "react";

import EditorCursorOverlay from "./EditorCursorOverlay";
import EditorLineNumbers from "./EditorLineNumbers";
import EditorLines from "./EditorLines";
import EditorStore from "./EditorStore";
import TextWidth from "../utils/TextWidth";

const Editor = (props: {}) => {
  TextWidth.init();

  return (
    <EditorStore.Container>
      <div className="editor-root">
        <EditorLineNumbers />
        <div className="editor-workspace">
          <EditorLines />
          <EditorCursorOverlay />
        </div>
      </div>
    </EditorStore.Container>
  );
};

export default Editor;
