import "../css/editor.css";

import * as React from "react";

import EditorStore from "./EditorStore";
import TextWidth from "../utils/TextWidth";

const LINE_HEIGHT = 21;

const EditorCursorOverlay = (props: {}) => {
  const store = EditorStore.useStore();
  const selection = store.get("selection");

  const charWidth = TextWidth.getCharWidth();

  const overlayRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const overlay = overlayRef.current;
    if (overlay == null) {
      return;
    }

    const overlayBounds = overlay.getBoundingClientRect();

    const offsetX = event.clientX - overlayBounds.left;
    const offsetY = event.clientY - overlayBounds.top;

    const line = Math.floor(offsetY / LINE_HEIGHT);
    const offset = Math.floor((offsetX + charWidth / 2) / charWidth);

    store.set("selection")({
      anchor: { line, offset }
    });
  };

  const onMouseUp = (e: React.MouseEvent) => {};

  return (
    <div
      ref={overlayRef}
      className="editor-cursor-overlay"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
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
