import "../css/editor.css";

import * as React from "react";

import { decrementLocation, setSelection } from "../utils/SelectionUtils";

import EditorStore from "../model/EditorStore";
import Selection from "../model/Selection";

export const EDITOR_INPUT_ID = "editor-input";
const TAB_WIDTH = 4;

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

    const { line, offset } = selection.focus;

    switch (event.key) {
      case "ArrowDown":
        if (line === lines.length - 1) {
          setSelection(
            store,
            Selection.point({
              line: lines.length - 1,
              offset: lines[lines.length - 1].length
            })
          );
          return;
        }

        setSelection(
          store,
          Selection.point({
            line: line + 1,
            offset: Math.min(offset, lines[line + 1].length)
          })
        );
        return;
      case "ArrowLeft":
        const newLocation = decrementLocation(selection.focus, store);

        setSelection(store, Selection.point(newLocation));
        return;
      case "ArrowRight":
        if (offset === lines[line].length) {
          if (line === lines.length - 1) {
            return;
          }

          setSelection(store, Selection.point({ line: line + 1, offset: 0 }));
          return;
        }

        setSelection(store, Selection.point({ line, offset: offset + 1 }));
        return;
      case "ArrowUp":
        if (line === 0) {
          setSelection(store, Selection.point({ line: 0, offset: 0 }));
          return;
        }

        setSelection(
          store,
          Selection.point({
            line: line - 1,
            offset: Math.min(offset, lines[line - 1].length)
          })
        );
        return;
      case "Backspace": {
        const newLines = lines.slice();

        if (selection.isCollapsed()) {
          if (offset === 0) {
            if (line === 0) {
              return;
            }

            newLines.splice(line - 1, 2, lines[line - 1] + lines[line]);
          } else {
            const oldLine = lines[line];
            const newLine =
              oldLine.substring(0, offset - 1) + oldLine.substring(offset);

            newLines.splice(line, 1, newLine);
          }

          store.set("lines")(newLines);

          const newLocation = decrementLocation(selection.focus, store);
          setSelection(store, Selection.point(newLocation));
        } else {
          const firstSelection = selection.getFirst();
          const secondSelection = selection.getSecond();

          const oldFirstLine = lines[firstSelection.line];
          const oldSecondLine = lines[secondSelection.line];
          const newLine =
            oldFirstLine.substring(0, firstSelection.offset) +
            oldSecondLine.substring(secondSelection.offset);

          newLines.splice(
            line,
            secondSelection.line - firstSelection.line + 1,
            newLine
          );

          store.set("lines")(newLines);
          setSelection(store, Selection.point(firstSelection));
        }

        return;
      }
      case "Enter": {
        const newLines = lines.slice();
        const oldLine = lines[line];

        newLines.splice(
          line,
          1,
          oldLine.substring(0, offset),
          oldLine.substring(offset)
        );

        store.set("lines")(newLines);
        setSelection(store, Selection.point({ line: line + 1, offset: 0 }));
        return;
      }
      case "Tab": {
        const newLines = lines.slice();
        const oldLine = lines[line];
        const newLine =
          oldLine.substring(0, offset) +
          " ".repeat(TAB_WIDTH) +
          oldLine.substring(offset);

        newLines.splice(line, 1, newLine);

        store.set("lines")(newLines);
        setSelection(
          store,
          Selection.point({ line, offset: offset + TAB_WIDTH })
        );

        event.preventDefault();

        return;
      }
      default:
        const newLines = lines.slice();
        const oldLine = lines[line];
        const newLine =
          oldLine.substring(0, offset) + event.key + oldLine.substring(offset);

        newLines.splice(line, 1, newLine);

        store.set("lines")(newLines);
        setSelection(store, Selection.point({ line, offset: offset + 1 }));
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
