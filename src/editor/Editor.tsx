import "../css/editor.css";

import * as React from "react";

import EditorStore, { setEditorStore } from "../model/EditorStore";

import EditorCursorOverlay from "./EditorCursorOverlay";
import EditorDrag from "../utils/EditorDrag";
import EditorInput from "./EditorInput";
import EditorLineNumbers from "./EditorLineNumbers";
import EditorLines from "./EditorLines";
import EditorSelectionOverlay from "./EditorSelectionOverlay";
import ScrollWorkspace from "../utils/ScrollWorkspace";
import TextWidth from "../utils/TextWidth";

export const EDITOR_CONTENTS_ID = "editor-contents";
export const EDITOR_WORKSPACE_ID = "editor-workspace";

const EditorStoreUpdater = (props: {}) => {
  const store = EditorStore.useStore();
  setEditorStore(store);

  return null;
};

const Editor = (props: {}) => {
  TextWidth.init();
  EditorDrag.init();
  ScrollWorkspace.init();

  return (
    <div className="editor-root">
      <EditorStoreUpdater />
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
  );
};

const EditorWrapper = (props: {}) => (
  <EditorStore.Container>
    <Editor />
  </EditorStore.Container>
);

export default EditorWrapper;
