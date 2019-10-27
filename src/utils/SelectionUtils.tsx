import { EDITOR_CONTENTS_ID } from "../editor/Editor";
import { EditorStore } from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import { Location } from "../model/Selection";
import ScrollWorkspace from "../utils/ScrollWorkspace";
import Selection from "../model/Selection";
import TextWidth from "./TextWidth";
import _ from "lodash";

export function mapClientPositionToLocation(x: number, y: number): Location {
  const contents = document.getElementById(EDITOR_CONTENTS_ID)!;
  const contentsBounds = contents.getBoundingClientRect();

  const offsetX = x - contentsBounds.left;
  const offsetY = y - contentsBounds.top;

  const charWidth = TextWidth.getCharWidth();

  const line = Math.floor(offsetY / LINE_HEIGHT);
  const offset = Math.floor((offsetX + charWidth / 2) / charWidth);

  return new Location({ line, offset });
}

export function clampLocationToText(
  location: Location,
  store: EditorStore
): Location {
  const lines = store.get("lines");
  const line = location.line;

  if (line >= lines.length) {
    return new Location({
      line: lines.length - 1,
      offset: lines[lines.length - 1].length
    });
  } else if (line < 0) {
    return Location.start();
  }

  return location.withOffset(clampOffsetToLine(location, store));
}

function clampOffsetToLine(location: Location, store: EditorStore): number {
  const lines = store.get("lines");
  return _.clamp(location.offset, 0, lines[location.line].length);
}

export function decrementLocation(
  location: Location,
  store: EditorStore
): Location {
  const { line, offset } = location;
  const lines = store.get("lines");

  if (offset === 0) {
    if (line === 0) {
      return Location.start();
    }

    return new Location({ line: line - 1, offset: lines[line - 1].length });
  }

  return location.left();
}

export function setSelection(
  store: EditorStore,
  selection: Selection,
  options?: { useShadowOffset?: boolean; bypassShadowOffset?: boolean }
) {
  const oldSelection = store.get("selection");
  if (
    oldSelection == null ||
    oldSelection.focus.offset !== selection.focus.offset
  ) {
    ScrollWorkspace.scrollIntoPaddedView(selection.focus.offset);
  }

  if (options != null && options.useShadowOffset === true) {
    let shadowOffset = store.get("shadowOffset");
    if (shadowOffset == null) {
      shadowOffset = selection.focus.offset;
      store.set("shadowOffset")(selection.focus.offset);
    }

    if (options.bypassShadowOffset === true) {
      store.set("selection")(selection);
    } else {
      const clampedOffset = clampOffsetToLine(
        selection.focus.withOffset(shadowOffset),
        store
      );
      const clampedFocus = selection.focus.withOffset(clampedOffset);

      if (selection.isCollapsed()) {
        store.set("selection")(Selection.point(clampedFocus));
      } else {
        store.set("selection")(selection.withFocus(clampedFocus));
      }
    }
  } else {
    store.set("shadowOffset")(null);
    store.set("selection")(selection);
  }
}

export default {};
