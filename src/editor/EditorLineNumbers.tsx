import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";

const EditorLineNumbers = (props: {}) => {
  let store = EditorStore.useStore();
  let lineCount = store.get("lines").length;
  let lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="editor-line-numbers">
      {lines.map(line => (
        <div key={line} className="editor-line-number editor-text">
          {line}
        </div>
      ))}
    </div>
  );
};

export default EditorLineNumbers;
