import "../css/editor.css";

import * as React from "react";

import {
  clampLocationToText,
  mapClientPositionToLocation,
  setSelection
} from "../utils/SelectionUtils";

import EditorDrag from "../utils/EditorDrag";
import EditorStore from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import Selection from "../model/Selection";
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

    setSelection(store, Selection.point(clampedLocation));

    EditorDrag.startDragging();
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (!EditorDrag.isDragging()) {
      return;
    }

    const location = mapClientPositionToLocation(event.clientX, event.clientY);
    const clampedLocation = clampLocationToText(location, store);

    const selection = store.get("selection");
    if (selection == null) {
      return;
    }

    setSelection(store, selection.withFocus(clampedLocation));
  };

  return (
    <div
      className="editor-workspace-overlay editor-cursor-overlay"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {selection != null && (
        <div
          key={`line-${selection.focus.line}-offset-${selection.focus.offset}`}
          className="editor-cursor"
          style={{
            top: selection.focus.line * LINE_HEIGHT,
            left: selection.focus.offset * charWidth - 1
          }}
        />
      )}
    </div>
  );
};

export default EditorCursorOverlay;
