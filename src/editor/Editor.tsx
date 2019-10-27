import "../css/editor.css";

import * as React from "react";

import EditorCursorOverlay from "./EditorCursorOverlay";
import EditorDrag from "../utils/EditorDrag";
import EditorInput from "./EditorInput";
import EditorLineNumbers from "./EditorLineNumbers";
import EditorLines from "./EditorLines";
import EditorSelectionOverlay from "./EditorSelectionOverlay";
import EditorStore from "../model/EditorStore";
import ScrollWorkspace from "../utils/ScrollWorkspace";
import TextWidth from "../utils/TextWidth";

export const EDITOR_CONTENTS_ID = "editor-contents";
export const EDITOR_WORKSPACE_ID = "editor-workspace";

const Editor = (props: {}) => {
  TextWidth.init();
  EditorDrag.init();
  ScrollWorkspace.init();

  return (
    <EditorStore.Container>
      <div className="editor-root">
        <EditorLineNumbers />
        <div id={EDITOR_WORKSPACE_ID}>
          <div id={EDITOR_CONTENTS_ID}>
            <EditorLines />
            <EditorSelectionOverlay />
            <EditorCursorOverlay />
          </div>
          <EditorInput />
        </div>
      </div>
    </EditorStore.Container>
  );
};

export default Editor;
