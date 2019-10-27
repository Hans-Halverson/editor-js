import "../css/editor.css";

import * as React from "react";

import EditorStore from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import TextWidth from "../utils/TextWidth";

const EditorSelectionOverlay = (props: {}) => {
  const store = EditorStore.useStore();
  const lines = store.get("lines");
  const selection = store.get("selection");
  if (selection == null) {
    return null;
  }

  const firstLocation = selection.getFirst();
  const secondLocation = selection.getSecond();
  const charWidth = TextWidth.getCharWidth();

  const selectedRanges = [];

  for (let i = 0; i < lines.length; i++) {
    if (i < firstLocation.line || i > secondLocation.line) {
      selectedRanges.push(null);
      continue;
    }

    const line = lines[i];

    if (i === firstLocation.line) {
      if (i === secondLocation.line) {
        if (firstLocation.offset === secondLocation.offset) {
          selectedRanges.push(null);
        } else if (firstLocation.offset < secondLocation.offset) {
          selectedRanges.push([firstLocation.offset, secondLocation.offset]);
        } else {
          selectedRanges.push([secondLocation.offset, firstLocation.offset]);
        }
      } else {
        selectedRanges.push([firstLocation.offset, line.length + 1]);
      }
    } else if (i === secondLocation.line) {
      selectedRanges.push([0, secondLocation.offset]);
    } else {
      selectedRanges.push([0, line.length + 1]);
    }
  }

  return (
    <div className="editor-workspace-overlay">
      {selectedRanges.map((range, i) => {
        if (range === null) {
          return null;
        }

        return (
          <div
            key={i}
            className="editor-selection-overlay"
            style={{
              top: `${i * LINE_HEIGHT}px`,
              left: `${range[0] * charWidth}px`,
              width: `${(range[1] - range[0]) * charWidth}px`
            }}
          />
        );
      })}
    </div>
  );
};

export default EditorSelectionOverlay;
