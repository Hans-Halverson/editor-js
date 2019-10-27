import { EDITOR_WORKSPACE_ID } from "../editor/Editor";
import { EditorStore } from "../model/EditorStore";
import { LINE_HEIGHT } from "../utils/LayoutConstants";
import { Location } from "../model/Selection";
import TextWidth from "./TextWidth";

export function mapClientPositionToLocation(x: number, y: number): Location {
  const workspace = document.getElementById(EDITOR_WORKSPACE_ID)!;
  const workspaceBounds = workspace.getBoundingClientRect();

  const offsetX = x - workspaceBounds.left;
  const offsetY = y - workspaceBounds.top;

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
  }

  const offset = Math.min(location.offset, lines[line].length);

  return { line, offset };
}

export default {};
