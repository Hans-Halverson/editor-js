import "../css/editor.css";

import * as React from "react";

import {
  clampLocationToText,
  mapClientPositionToLocation
} from "../utils/SelectionUtils";

import EditorStore from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import TextWidth from "../utils/TextWidth";
import { focusEditorInput } from "./EditorInput";

const EditorCursorOverlay = (props: {}) => {
  const store = EditorStore.useStore();
  const selection = store.get("selection");

  const charWidth = TextWidth.getCharWidth();

  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    focusEditorInput();

    const location = mapClientPositionToLocation(event.clientX, event.clientY);
    const clampedLocation = clampLocationToText(location, store);

    store.set("selection")({
      anchor: clampedLocation
    });
  };

  return (
    <div className="editor-cursor-overlay" onMouseDown={onMouseDown}>
      {selection != null && (
        <div
          key={`line-${selection.anchor.line}-offset-${selection.anchor.offset}`}
          className="editor-cursor"
          style={{
            top: selection.anchor.line * LINE_HEIGHT,
            left: selection.anchor.offset * charWidth - 1
          }}
        />
      )}
    </div>
  );
};

export default EditorCursorOverlay;
