import { EDITOR_CONTENTS_ID, EDITOR_WORKSPACE_ID } from "../editor/Editor";

import EditorDrag from "./EditorDrag";
import TextWidth from "./TextWidth";

const LEFT_SCROLL_PADDING = 3.5;
const RIGHT_SCROLL_PADDING = 2;

class ScrollWorkspace {
  static init() {
    document.body.addEventListener("mousemove", (event: MouseEvent) => {
      if (!EditorDrag.isDragging()) {
        return;
      }

      const workspace = document.getElementById(EDITOR_WORKSPACE_ID)!;
      const workspaceBounds = workspace.getBoundingClientRect();

      if (
        event.clientX >= workspaceBounds.left &&
        event.clientX <= workspaceBounds.right
      ) {
        return;
      }

      const contents = document.getElementById(EDITOR_CONTENTS_ID)!;
      const contentsBounds = contents.getBoundingClientRect();

      const charWidth = TextWidth.getCharWidth();

      ScrollWorkspace.scrollIntoPaddedView(
        (event.clientX - contentsBounds.left) / charWidth
      );
    });
  }

  static scrollX(x: number) {
    const workspace = document.getElementById(EDITOR_WORKSPACE_ID)!;
    workspace.scrollLeft = x;
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
      ScrollWorkspace.scrollX(leftPaddedOffset);
    } else if (rightPaddedX > workspaceBounds.right) {
      ScrollWorkspace.scrollX(
        rightPaddedOffset - (workspaceBounds.right - workspaceBounds.left)
      );
    }
  }
}

export default ScrollWorkspace;
