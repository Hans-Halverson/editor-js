import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";

export const EDITOR_INPUT_ID = "editor-input";

export function focusEditorInput() {
  const input = document.getElementById(EDITOR_INPUT_ID)!;
  input.focus();
}

const EditorInput = (props: {}) => {
  const store = EditorStore.useStore();

  const onBlur = () => store.set("selection")(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const lines = store.get("lines");
    const selection = store.get("selection");
    if (selection == null) {
      return;
    }

    const { line, offset } = selection.anchor;

    switch (event.key) {
      case "ArrowDown":
        if (line === lines.length - 1) {
          store.set("selection")({
            anchor: {
              line: lines.length - 1,
              offset: lines[lines.length - 1].length
            }
          });
          return;
        }

        store.set("selection")({
          anchor: {
            line: line + 1,
            offset: Math.min(offset, lines[line + 1].length)
          }
        });
        return;
      case "ArrowLeft":
        if (offset === 0) {
          if (line === 0) {
            return;
          }

          store.set("selection")({
            anchor: { line: line - 1, offset: lines[line - 1].length }
          });
          return;
        }

        store.set("selection")({ anchor: { line, offset: offset - 1 } });
        return;
      case "ArrowRight":
        if (offset === lines[line].length) {
          if (line === lines.length - 1) {
            return;
          }

          store.set("selection")({ anchor: { line: line + 1, offset: 0 } });
          return;
        }

        store.set("selection")({ anchor: { line, offset: offset + 1 } });
        return;
      case "ArrowUp":
        if (line === 0) {
          store.set("selection")({ anchor: { line: 0, offset: 0 } });
          return;
        }

        store.set("selection")({
          anchor: {
            line: line - 1,
            offset: Math.min(offset, lines[line - 1].length)
          }
        });
        return;
      default:
        const oldLine = lines[line];
        const preText = oldLine.substring(0, offset);
        const postText = oldLine.substring(offset);

        const newLine = preText + event.key + postText;
        const newLines = lines.slice();
        newLines.splice(line, 1, newLine);

        store.set("lines")(newLines);
        store.set("selection")({ anchor: { line, offset: offset + 1 } });
        return;
    }
  };

  return (
    <textarea
      id={EDITOR_INPUT_ID}
      className="editor-input"
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default EditorInput;
