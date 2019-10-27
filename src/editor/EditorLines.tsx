import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";

const EditorLines = (props: {}) => {
  let store = EditorStore.useStore();
  let lines = store.get("lines");

  return (
    <div className="editor-lines">
      {lines.map((line, idx) => (
        <pre key={idx} className="editor-line editor-text">
          {line}
        </pre>
      ))}
    </div>
  );
};

export default EditorLines;
