import { EDITOR_CONTENTS_ID, EDITOR_WORKSPACE_ID } from "../editor/Editor";
import {
  clampLocationToText,
  mapClientPositionToLocation,
  setSelection
} from "./SelectionUtils";

import EditorDrag from "./EditorDrag";
import { Location } from "../model/Selection";
import TextWidth from "./TextWidth";
import _ from "lodash";
import { getEditorStore } from "../model/EditorStore";

const LEFT_SCROLL_PADDING = 3.5;
const RIGHT_SCROLL_PADDING = 2;

class ScrollWorkspace {
  static init() {
    window.addEventListener("mousemove", (event: MouseEvent) => {
      if (!EditorDrag.isDragging()) {
        return;
      }

      const store = getEditorStore();
      const selection = store.get("selection");
      if (selection === null) {
        return;
      }

      const workspace = document.getElementById(EDITOR_WORKSPACE_ID)!;
      const workspaceBounds = workspace.getBoundingClientRect();
      let location = mapClientPositionToLocation(event.clientX, event.clientY);

      if (event.clientX < workspaceBounds.left) {
        location = location.withOffset(0);
      } else if (event.clientX > workspaceBounds.right) {
        const lines = store.get("lines");
        const clampedLine = _.clamp(location.line, 0, lines.length - 1);
        location = new Location({
          line: clampedLine,
          offset: lines[clampedLine].length
        });
      }

      const focus = clampLocationToText(location, store);
      setSelection(store, selection.withFocus(focus));
    });
  }

  static scrollIntoPaddedView(offset: number) {
    const workspace = document.getElementById(EDITOR_WORKSPACE_ID)!;
    const contents = document.getElementById(EDITOR_CONTENTS_ID)!;
    const workspaceBounds = workspace.getBoundingClientRect();
    const contentsBounds = contents.getBoundingClientRect();

    const charWidth = TextWidth.getCharWidth();
    const leftPaddedOffset = (offset - LEFT_SCROLL_PADDING) * charWidth;
    const rightPaddedOffset = (offset + RIGHT_SCROLL_PADDING) * charWidth;
    const leftPaddedX = contentsBounds.left + leftPaddedOffset;
    const rightPaddedX = contentsBounds.left + rightPaddedOffset;

    if (leftPaddedX < workspaceBounds.left) {
      workspace.scrollLeft = leftPaddedOffset;
    } else if (rightPaddedX > workspaceBounds.right) {
      workspace.scrollLeft =
        rightPaddedOffset - (workspaceBounds.right - workspaceBounds.left);
    }
  }
}

export default ScrollWorkspace;
