import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";

const EditorLineNumbers = (props: {}) => {
  const store = EditorStore.useStore();
  const lineCount = store.get("lines").length;
  const lines = Array.from({ length: lineCount }, (_, idx) => idx + 1);

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
