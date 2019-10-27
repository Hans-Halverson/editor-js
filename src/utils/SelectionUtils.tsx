import { EDITOR_CONTENTS_ID } from "../editor/Editor";
import { EditorStore } from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import { Location } from "../model/Selection";
import ScrollWorkspace from "../utils/ScrollWorkspace";
import Selection from "../model/Selection";
import TextWidth from "./TextWidth";

export function mapClientPositionToLocation(x: number, y: number): Location {
  const contents = document.getElementById(EDITOR_CONTENTS_ID)!;
  const contentsBounds = contents.getBoundingClientRect();

  const offsetX = x - contentsBounds.left;
  const offsetY = y - contentsBounds.top;

  const charWidth = TextWidth.getCharWidth();

  const line = Math.floor(offsetY / LINE_HEIGHT);
  const offset = Math.floor((offsetX + charWidth / 2) / charWidth);

  return { line, offset };
}

export function clampLocationToText(
  location: Location,
  store: EditorStore
): Location {
  const lines = store.get("lines");
  const line = location.line;

  if (line >= lines.length) {
    return {
      line: lines.length - 1,
      offset: lines[lines.length - 1].length
    };
  } else if (line < 0) {
    return {
      line: 0,
      offset: 0
    };
  }

  const offset = Math.max(Math.min(location.offset, lines[line].length), 0);

  return { line, offset };
}

export function decrementLocation(
  location: Location,
  store: EditorStore
): Location {
  const { line, offset } = location;
  const lines = store.get("lines");

  if (offset === 0) {
    if (line === 0) {
      return location;
    }

    return { line: line - 1, offset: lines[line - 1].length };
  }

  return { line, offset: offset - 1 };
}

export function setSelection(store: EditorStore, selection: Selection) {
  ScrollWorkspace.scrollIntoPaddedView(selection.focus.offset);
  store.set("selection")(selection);
}

export default {};
